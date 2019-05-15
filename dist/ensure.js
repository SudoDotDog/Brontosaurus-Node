"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var Ensure = (function () {
    function Ensure(server, applicationKey) {
        this._server = server;
        this._applicationKey = applicationKey;
    }
    Ensure.create = function (server, applicationKey) {
        return new Ensure(server, applicationKey);
    };
    Ensure.prototype.token = function (token) {
        return token_1.Token.create(token, this._server, this._applicationKey);
    };
    return Ensure;
}());
exports.Ensure = Ensure;
