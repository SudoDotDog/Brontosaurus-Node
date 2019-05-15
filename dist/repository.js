"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = require("request");
var Url = require("url");
exports.validateRepository = function (server, token) {
    return new Promise(function (resolve, reject) {
        var route = Url.resolve(server, '/validate');
        var options = {
            uri: route,
            method: 'POST',
            json: {
                token: token,
            },
        };
        Request(options, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                reject(error);
            }
            resolve(body);
        });
    });
};
