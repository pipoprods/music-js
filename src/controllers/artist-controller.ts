import { BaseController } from '@controllers/base-controller';
import {Request, Response, NextFunction} from 'express';
import { Mpc } from '@services/mpc';

export class ArtistController extends BaseController {
    private mpc: Mpc;

    constructor(mpc: Mpc) {
        super();
        this.mpc = mpc;
    }

    // Get artists
    public getArtists(req: Request, res: Response, next: NextFunction): void {
        this.mpc.artists()
            .then(data => res.json(this.paginateData(req, data)))
            .catch(err => next(err));
    }

    // Get artist albums
    public getArtistAlbums(req: Request, res: Response, next: NextFunction): void {
        this.mpc.albums(decodeURIComponent(req.params.id))
            .then(data => res.json(this.paginateData(req, data)))
            .catch(err => next(err));
    }
}