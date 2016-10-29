import * as express     from 'express';
import * as path        from 'path';
import * as logger      from 'morgan';
import * as bodyParser  from 'body-parser';
import * as index from './routes/index';


/**
 * Server
 */
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.errorHandlers();
        this.routes();
    }

    private config() {
        // basic config
        // this.app.use( logger('combined', {skip: function(req, res){ return true; }}));
        // this.app.use( logger('dev'));
        this.app.use( bodyParser.json());
        this.app.use( bodyParser.urlencoded({ extended: true}));
    }

    // mount all routes 
    private routes() {
        this.app.use(index.default.mountAll());
    }

    private errorHandlers() {
        // basic error handling
        this.app.use(function (err: any, req, res, next) {
            let error = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use(function (err: any, req, res, next) {
                res.status(err.status || 500);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        this.app.use(function (err: any, req, res, next) {
            res.status(err.status || 500);
            res.render({
                message: err.message,
                error: {}
            });
        });
    }

}

export = new Server().app;



