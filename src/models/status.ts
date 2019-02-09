import { Base } from '@models/base';

export class Status extends Base {
    state: string;

    public isPlaying(): boolean {
        return this.state === 'play';
    }
}