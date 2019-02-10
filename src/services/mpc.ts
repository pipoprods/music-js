import * as mpd from 'mpdclient.js';
import { Status } from '@models/status';
import { Artist } from '@models/artist';
import { Album } from '@models/album';

export class Mpc {
    private mpc: mpd.MPDClient;

    constructor(host?: string, port?: number) {
        // Connect to server
        this.mpc = new mpd.MPDClient(host || 'localhost', port || 6600);
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
        const cmd = new mpd.MPDCommand(`list album "${artist}"`);
        let albums: Album[] = await this.mpc.execute(cmd)
            .then(response => { return this.forceArray(response.response[0].Album).map(a => Object.assign(new Album(), { name: a })); })
            .catch(error => this.error(error));

        // Get album dates
        for (let index = 0; index < albums.length; index++) {
            albums[index].year = await this.mpc.execute(new mpd.MPDCommand(`list date artist "${artist}" album "${albums[index].name}"`))
                .then(response => {
                    return this.forceArray(response.response[0].Date)[0];
                })
                .catch(error => this.error(error));
        }

        return Promise.resolve(albums);
    }

    // Ensure data is an array
    private forceArray(data) {
        return data instanceof Array ? data : [ data ];
    }
}