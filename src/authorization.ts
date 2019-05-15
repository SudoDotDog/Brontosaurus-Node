/**
 * @author WMXPY
 * @namespace Node
 * @description Node
 */

import { AuthToken } from "./token";

export class Authorization {

    public static create(server?: string, applicationKey?: string) {

        return new Authorization(server, applicationKey);
    }

    private readonly _server?: string;
    private readonly _applicationKey?: string;

    private constructor(server?: string, applicationKey?: string) {

        this._server = server;
        this._applicationKey = applicationKey;
    }

    public token(token: string) {

        return AuthToken.create(token, this._server, this._applicationKey);
    }
}
