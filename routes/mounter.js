"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var router_1 = require('./router');
var users_1 = require('./users');
var Mounter = (function (_super) {
    __extends(Mounter, _super);
    function Mounter() {
        _super.apply(this, arguments);
    }
    Mounter.prototype.getHomePage = function () {
        return function (req, res) {
            res.send('Bllman root page');
        };
    };
    ;
    Mounter.prototype.RootRoute = function () {
        return '/z';
    };
    Mounter.prototype.mountRoutes = function () {
        this.mountRoute('get', this.getHomePage());
        console.log('Home Mounted !');
    };
    ;
    Mounter.mountAll = function () {
        return [
            new Mounter().router,
            new users_1.default().router
        ];
    };
    return Mounter;
}(router_1.default));
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mounter;
//# sourceMappingURL=mounter.js.map