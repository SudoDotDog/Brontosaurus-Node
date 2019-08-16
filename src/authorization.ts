/**
 * @author WMXPY
 * @namespace Node
 * @description Node
 */

import { AuthAgent } from "./agent";
import { AuthToken } from "./token";

export class Authorization {

    public static create(
        server?: string,
        applicationKey?: string,
        publicKey?: string,
    ) {

        return new Authorization(
            server,
            applicationKey,
            publicKey,
        );
    }

    private readonly _server?: string;
    private readonly _applicationKey?: string;
    private readonly _publicKey?: string;

    private constructor(
        server?: string,
        applicationKey?: string,
        publicKey?: string,
    ) {

        this._server = server;
        this._applicationKey = applicationKey;
        this._publicKey = publicKey;
    }

    public token(token: string) {

        return AuthToken.create(
            token,
            this._server,
            this._applicationKey,
            this._publicKey,
        );
    }

    public agent() {

        return AuthAgent.create(this._server, this._applicationKey);
    }
}
