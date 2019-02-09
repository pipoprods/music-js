import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Mpc } from '@services/mpc';
import { StatusRoutes } from './routes/status-routes';
import { ArtistRoutes } from './routes/artist-routes';

class MusicCollection {
    public app: express.Application;

    // Routes
    public routeHandlers = [
        StatusRoutes,
        ArtistRoutes,
    ];

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // MPD client
        this.app.set('mpc', new Mpc());

        // support application/json type post data
        this.app.use(bodyParser.json());
        // Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Declare routes
        this.routeHandlers.forEach(type => {
            let handler = new type(this.app);
            this.app.use(handler.prefix, handler.router);
        });
        // Generic error handler
        this.app.use(function(err, req, res, next) {
            console.error(err);
            res.status(500).send('Internal server error');
        });
    }
}

export default new MusicCollection().app;