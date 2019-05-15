/**
 * @author WMXPY
 * @namespace Node
 * @description Node
 */

import { Token } from "./token";

export class Ensure {

    public static create(server?: string, applicationKey?: string) {

        return new Ensure(server, applicationKey);
    }

    private readonly _server?: string;
    private readonly _applicationKey?: string;

    private constructor(server?: string, applicationKey?: string) {

        this._server = server;
        this._applicationKey = applicationKey;
    }

    public token(token: string) {

        return Token.create(token, this._server, this._applicationKey);
    }
}
