import { BaseController } from './base-controller';
import {Request, Response, NextFunction} from 'express';
import { Mpc } from '@services/mpc';

export class StatusController extends BaseController {
    private mpc: Mpc;

    constructor(mpc: Mpc) {
        super();
        this.mpc = mpc;
    }

    // Get player status
    public getStatus(req: Request, res: Response, next: NextFunction): void {
        this.mpc.status()
            .then(response => res.json(response))
            .catch(err => next(err));
    }

    // Get player playing status
    public isPlaying(req: Request, res: Response, next: NextFunction): void {
        this.mpc.status()
            .then(response => res.json(response.isPlaying()))
            .catch(err => next(err));
    }
}