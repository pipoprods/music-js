import * as mpd from 'mpdclient.js';
import * as fs from 'fs';
import { Status } from '@models/status';
import { Artist } from '@models/artist';
import { Album } from '@models/album';

export class Mpc {
    private mpc: mpd.MPDClient;

    constructor(host?: string, port?: number) {
        // Connect to server
        this.mpc = new mpd.MPDClient(host || process.env.MPD_HOST || 'localhost', port || process.env.MPD_PORT || 6600);
    }

    // Log errors
    private error(err: string): void {
        console.error('MPD error:');
        console.error(JSON.stringify(err, null, 2));
        throw(err);
    }

    // Get server status
    public status(): Promise<Status> {
        const cmd = new mpd.MPDCommand('status');
        return this.mpc.execute(cmd)
            .then(response => { return Object.assign(new Status(), response.response[0]); })
            .catch(error => this.error(error));
    }

    // Get artist list
    public artists(): Promise<Artist[]> {
        const cmd = new mpd.MPDCommand('list artist');
        return this.mpc.execute(cmd)
            .then(response => { return this.forceArray(response.response[0].Artist).map(a => Object.assign(new Artist(), { name: a })); })
            .catch(error => this.error(error));
    }
    // Get artist albums
    public async albums(artist: string): Promise<Album[]> {
        const cmd = new mpd.MPDCommand(`list album "${this.sanitizeArg(artist)}"`);
        let albums: Album[] = await this.mpc.execute(cmd)
            .then(response => { return this.forceArray(response.response[0].Album).map(a => Object.assign(new Album(), { name: a })); })
            .catch(error => this.error(error));

        // Get album dates
        for (let index = 0; index < albums.length; index++) {
            let data = await this.mpc.execute(new mpd.MPDCommand(`find artist "${this.sanitizeArg(artist)}" album "${this.sanitizeArg(albums[index].name)}"`))
                .then(response => {
                    let cover: string = undefined;
                    let path = this.forceArray(response.response[0] ? response.response[0].file : '')[0].replace(/[^\/]*$/, '');
                    ['front.jpg', 'front.png'].forEach(file => {
                        if (cover !== undefined) return;
                        cover = fs.existsSync(`media/${path}${file}`) ? `${path}${file}` : undefined;
                    });
                    return {
                        year: this.forceArray(response.response[0] ? response.response[0].Date : undefined)[0],
                        cover: cover
                    };
                })
                .catch(error => this.error(error));
            albums[index].year = data.year;
            albums[index].cover = data.cover;
        }

        return Promise.resolve(albums);
    }

    // Ensure data is an array
    private forceArray(data) {
        return data instanceof Array ? data : [ data ];
    }

    private sanitizeArg(arg: string): string {
        return arg.replace(/"/g, '\\"');
    }
}