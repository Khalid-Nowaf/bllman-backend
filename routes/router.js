"use strict";
var express = require('express');
var Router = (function () {
    function Router() {
        this.router = express.Router();
        this.mountRoutes();
    }
    Router.prototype.route = function (method, handller) {
        var _method = method.toLowerCase();
        switch (_method) {
            case 'get': break;
            case 'post': break;
            case 'delete': break;
            case 'update': break;
            default: new Error('invalid req method');
        }
        this.router[_method](this.RootPath(), handller);
    };
    return Router;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=router.js.map