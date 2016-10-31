// Dependancies
import * as express     from 'express';
import * as path        from 'path';
import * as bodyParser  from 'body-parser';
import * as mongoose    from 'mongoose';
import  * as _          from 'lodash';
// The router Index
import * as index from './routes/index';
// Configuration file
import Config from './config';


/**
 * Server
 */
class Server {
    public app: express.Application;
    public Config: Config;
    public DB: mongoose.Mongoose;
    constructor() {
        this.app = express();
        this.config();
        this.DBConn();
        this.routes();
        this.ClienterrorHandlers();
        this.errorHandlers();

    }

    private config() {
        // basic config
        this.Config = new Config(this.app.get('env'));
        // this.app.use( logger('combined', {skip: function(req, res){ return true; }}));
        this.app.use(this.Config.LOGGER);
        this.app.use( bodyParser.json());
        this.app.use( bodyParser.urlencoded({ extended: true}));
    }

    // mount all routes 
    private routes() {
        this.app.use(index.default.mountAll());
    }

    private DBConn() {
        this.DB = mongoose;
        this.DB.Promise = global.Promise;
        mongoose.connect(this.Config.DB)
        .then( () => { console.log('DB connected'); })
        .catch((e) => { console.log('DB NOT CONNECTED !!!'); });
    }

    private ClienterrorHandlers() {
        // Client error handling
        this.app.use(function (err: any, req, res, next) {
            if ( _.startsWith(err.toString()), 'ValidationError:') {
               try {
                   // extract the json errors
                    let errors = _.split( _.trim(err.toString(), 'ValidationError:'), ', ');
                    errors.forEach((v, k) => { errors[k] = JSON.parse(v); });
                   // console.log(errors);

                    res.status(400).send({errors: errors});
               }catch (e) {
                    console.log(err.toString());
                    res.status(400).send(err.toString());
               };
            } else next(err);
        });
    }

    private errorHandlers() {


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
        } else {
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

}

export = new Server().app;



