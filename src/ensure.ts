/**
 * @author WMXPY
 * @namespace Node
 * @description Node
 */

import { Token } from "./token";

export class Ensure {

    public static create(server?: string) {

        return new Ensure(server);
    }

    private readonly _server?: string;

    private constructor(server?: string) {

        this._server = server;
    }

    public token() {

        return Token.create('', this._server);
    }
}
