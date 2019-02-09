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
    }
}