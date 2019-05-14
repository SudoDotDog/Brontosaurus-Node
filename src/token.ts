/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe, SafeObject } from "@sudoo/extract";
import { validateRepository } from "./repository";
import { getDefaultServer, parseToken, TokenType } from "./util";

export class Token {

    public static create(token: string, server: string | undefined = getDefaultServer()): Token | null {

        const parsedToken: TokenType | null = parseToken(token);

        if (!parsedToken) {
            return null;
        }

        return new Token(token, parsedToken, server);
    }

    private readonly _raw: string;
    private readonly _token: TokenType;
    private readonly _server: string | undefined;

    private constructor(raw: string, token: TokenType, server: string | undefined) {

        this._raw = raw;
        this._token = token;
        this._server = server;
    }

    public get header(): SafeObject<IBrontosaurusHeader> {

        return Safe.object(this._token.header);
    }

    public get body(): SafeObject<IBrontosaurusBody> {

        return Safe.object(this._token.body);
    }

    public match(applicationKey: string): boolean {

        if (!this._token.header.key) {
            return false;
        }

        return this._token.header.key === applicationKey;
    }

    public clock(time: number = Date.now()) {

        if (!this._token.header.expireAt) {
            return false;
        }

        return this._token.header.expireAt < time;
    }

    public async validate(server?: string): Promise<boolean> {

        const checked: string = this._checkServer(server);

        return await validateRepository(checked, this._raw);
    }

    private _checkServer(server?: string): string {

        if (server) {
            return server;
        }

        if (this._server) {
            return this._server;
        }

        throw new Error('Need Server');
    }
}
