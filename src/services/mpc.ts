import * as mpd from 'mpdclient.js';
import { Status } from '@models/status';

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
}