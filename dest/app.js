"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var config_1 = require('./config');
var Server = (function () {
    function Server() {
        this.app = express();
        this.Config = new config_1.default(this.app.get('env'));
        this.config();
        this.errorHandlers();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.use(this.Config.LOGGER);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    Server.prototype.routes = function () {
        this.app.use(index.default.mountAll());
    };
    Server.prototype.errorHandlers = function () {
        this.app.use(function (err, req, res, next) {
            var error = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        if (this.app.get('env') === 'development') {
            this.app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render({
                message: err.message,
                error: {}
            });
        });
    };
    return Server;
}());
module.exports = new Server().app;
//# sourceMappingURL=app.js.map