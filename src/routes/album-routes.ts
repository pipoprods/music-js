import {Router, Request, Response, NextFunction} from 'express';
import { AlbumController } from '../controllers/album-controller';

export class AlbumRoutes {
    // Controller route prefix
    public prefix = '/album';
    public router = Router();

    public albumController: AlbumController;

    constructor(app) {
        this.albumController = new AlbumController(app.get('mpc'));

        this.router.route('/cover')
            .get((req: Request, res: Response, next: NextFunction) => { return this.albumController.getAlbumCover(req, res, next); });
    }
}
