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
    private readonly _server: string;

    private constructor(token: SafeToken, server: string) {

        this._token = token;
        this._server = server;
    }
}
