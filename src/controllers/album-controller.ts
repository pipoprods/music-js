import { BaseController } from '@controllers/base-controller';
import {Request, Response, NextFunction} from 'express';
import { Mpc } from '@services/mpc';
import { Image } from '@services/image';

export class AlbumController extends BaseController {
    private mpc: Mpc;

    constructor(mpc: Mpc) {
        super();
        this.mpc = mpc;
    }

    // Get album cover
    public getAlbumCover(req: Request, res: Response, next: NextFunction): void {
        let path = decodeURIComponent(req.params.id);
        let img = new Image(`media/${path}`);
        res.type(img.mimeType());
        img.resize().pipe(res);
    }
}