"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@brontosaurus/core");
exports.parseToken = function (token) {
    var header = core_1.Brontosaurus.decoupleHeader(token);
    var body = core_1.Brontosaurus.decoupleBody(token);
    if (!body || !header) {
        return null;
    }
    return {
        header: header,
        body: body,
    };
};
exports.getDefaultServer = function () {
    if (process.env.BRONTOSAURUS_SERVER) {
        return process.env.BRONTOSAURUS_SERVER;
    }
    return;
};
exports.getDefaultApplicationKey = function () {
    if (process.env.BRONTOSAURUS_APPLICATION_KEY) {
        return process.env.BRONTOSAURUS_APPLICATION_KEY;
    }
    return;
};
