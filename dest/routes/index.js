"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var router_1 = require('./router');
var users_1 = require('./users');
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        _super.apply(this, arguments);
    }
    Index.prototype.getHomePage = function () {
        return function (req, res) {
            res.send('Bllman root page');
        };
    };
    ;
    Index.prototype.RootPath = function () {
        return '/';
    };
    Index.prototype.mountRoutes = function () {
        this.route('get', this.getHomePage());
    };
    ;
    Index.mountAll = function () {
        return [
            new Index().router,
            new users_1.default().router
        ];
    };
    return Index;
}(router_1.default));
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Index;
//# sourceMappingURL=index.js.map