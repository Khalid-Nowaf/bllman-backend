"use strict";
var logger = require('morgan');
var Config = (function () {
    function Config(ENV) {
        switch (ENV) {
            case 'development':
                this.PORT = '3000';
                this.DEBUG = 'DEBUG=dev:*';
                this.LOGGER = logger('dev');
                break;
            case 'testing':
                this.PORT = '3000';
                this.DEBUG = 'DEBUG=test:*';
                this.LOGGER = logger('combined', { skip: function (req, res) { return true; } });
                break;
            default:
                process.env.NODE_ENV = 'development';
                this.PORT = '3000';
                this.DEBUG = 'DEBUG=dev:*';
                this.LOGGER = logger('dev');
                break;
        }
        process.env.DEBUG = this.DEBUG;
        process.env.PORT = this.PORT;
    }
    return Config;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Config;
//# sourceMappingURL=index.js.map