import {Router, Request, Response, NextFunction} from 'express';
import { ArtistController } from '../controllers/artist-controller';

export class ArtistRoutes {
    // Controller route prefix
    public prefix = '/artist';
    public router = Router();

    public artistController: ArtistController;

    constructor(app) {
        this.artistController = new ArtistController(app.get('mpc'));

        this.router.route('/')
            .get((req: Request, res: Response, next: NextFunction) => { return this.artistController.getArtists(req, res, next); });

        this.router.route('/count')
            .get((req: Request, res: Response, next: NextFunction) => { return this.artistController.getArtistCount(req, res, next); });

        this.router.route('/:id/albums')
            .get((req: Request, res: Response, next: NextFunction) => { return this.artistController.getArtistAlbums(req, res, next); });
    }
}