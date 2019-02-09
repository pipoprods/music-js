import * as mpd from 'mpdclient.js';
import { Status } from '@models/status';
import { Artist } from '@models/artist';

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

    // Ensure data is an array
    private forceArray(data) {
        return data instanceof Array ? data : [ data ];
    }
}