import {Router, Request, Response, NextFunction} from 'express';
import { StatusController } from '../controllers/status-controller';

export class StatusRoutes {
    // Controller route prefix
    public prefix = '/status';
    public router = Router();

    public statusController: StatusController;

    constructor(app) {
        this.statusController = new StatusController(app.get('mpc'));

        // Get player status
        this.router.route('/')
            .get((req: Request, res: Response, next: NextFunction) => { return this.statusController.getStatus(req, res, next); });

        // Get player plaing status
        this.router.route('/playing')
            .get((req: Request, res: Response, next: NextFunction) => { return this.statusController.isPlaying(req, res, next); });
    }
}