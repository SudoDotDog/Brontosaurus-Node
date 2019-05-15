"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var extract_1 = require("@sudoo/extract");
var repository_1 = require("./repository");
var util_1 = require("./util");
var Token = (function () {
    function Token(raw, token, server, applicationKey) {
        this._raw = raw;
        this._token = token;
        this._server = server;
        this._applicationKey = applicationKey;
    }
    Token.create = function (token, server, applicationKey) {
        if (server === void 0) { server = util_1.getDefaultServer(); }
        if (applicationKey === void 0) { applicationKey = util_1.getDefaultApplicationKey(); }
        var parsedToken = util_1.parseToken(token);
        if (!parsedToken) {
            return null;
        }
        return new Token(token, parsedToken, server, applicationKey);
    };
    Object.defineProperty(Token.prototype, "header", {
        get: function () {
            return extract_1.Safe.object(this._token.header);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Token.prototype, "body", {
        get: function () {
            return extract_1.Safe.object(this._token.body);
        },
        enumerable: true,
        configurable: true
    });
    Token.prototype.match = function (applicationKey) {
        if (!this._token.header.key) {
            return false;
        }
        return this._token.header.key === this._checkApplicationKey(applicationKey);
    };
    Token.prototype.clock = function (time) {
        if (time === void 0) { time = Date.now(); }
        if (!this._token.header.expireAt) {
            return false;
        }
        return this._token.header.expireAt < time;
    };
    Token.prototype.validate = function (server) {
        return __awaiter(this, void 0, void 0, function () {
            var checked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checked = this._checkServer(server);
                        return [4, repository_1.validateRepository(checked, this._raw)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Token.prototype._checkApplicationKey = function (applicationKey) {
        if (applicationKey) {
            return applicationKey;
        }
        if (this._applicationKey) {
            return this._applicationKey;
        }
        throw new Error('Need application key');
    };
    Token.prototype._checkServer = function (server) {
        if (server) {
            return server;
        }
        if (this._server) {
            return this._server;
        }
        throw new Error('Need Server');
    };
    return Token;
}());
exports.Token = Token;
