/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { SafeToken } from "./declare";
import { getDefaultServer, parseToken } from "./util";

export class Token {

    public static create(token: string, server: string = getDefaultServer()): Token | null {

        const safeToken: SafeToken | null = parseToken(token);

        if (!safeToken) {
            return null;
        }

        return new Token(safeToken, server);
    }

    private readonly _token: SafeToken;
    private readonly _server: string | undefined;

    private constructor(token: SafeToken, server: string | undefined) {

        this._token = token;
        this._server = server;
    }

    public async validate(server?: string) {

        this._checkServer(server);
    }

    private _checkServer(server?: string) {

        if (!this._server && !server) {

            throw new Error('Need Server');
        }
    }
}
