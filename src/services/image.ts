import * as fs from 'fs';
import * as readChunk from 'read-chunk';
import * as fileType from 'file-type';
import * as sharp from 'sharp';

export class Image {
    private path: string;
    private mime: string;

    constructor(path: string) {
        this.path = path.replace(/\//g, '/');
        this.sanitizePath();
        this.checkFile();
    }

    public resize(width?: number) {
        const readStream = fs.createReadStream(this.path);
        const resize = sharp().resize(width || 200);
        return readStream.pipe(resize);
    }

    public mimeType() {
        return this.mime;
    }

    private sanitizePath() {
        this.path.replace(/\.\./g, '');
    }

    private checkFile() {
        const buffer = readChunk.sync(this.path, 0, fileType.minimumBytes);
        const type = fileType(buffer);
        if (!type.mime.match(/^image\//)) {
            throw `File ${this.path} is not an image`;
        }
        this.mime = type.mime;
    }
}
