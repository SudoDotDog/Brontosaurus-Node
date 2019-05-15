/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe, SafeObject } from "@sudoo/extract";
import { ERROR_CODE, panic } from "./panic";
import { validateRepository } from "./repository";
import { getDefaultApplicationKey, getDefaultServer, parseToken, TokenType } from "./util";

export class AuthToken {

    public static create(
        token: string,
        server: string | undefined = getDefaultServer(),
        applicationKey: string | undefined = getDefaultApplicationKey(),
    ): AuthToken | null {

        const parsedToken: TokenType | null = parseToken(token);

        if (!parsedToken) {
            return null;
        }

        return new AuthToken(token, parsedToken, server, applicationKey);
    }

    private readonly _raw: string;
    private readonly _token: TokenType;
    private readonly _server?: string;
    private readonly _applicationKey?: string;

    private constructor(raw: string, token: TokenType, server?: string, applicationKey?: string) {

        this._raw = raw;
        this._token = token;
        this._server = server;
        this._applicationKey = applicationKey;
    }

    public get header(): SafeObject<IBrontosaurusHeader> {

        return Safe.object(this._token.header);
    }

    public get body(): SafeObject<IBrontosaurusBody> {

        return Safe.object(this._token.body);
    }

    public match(applicationKey?: string): boolean {

        if (!this._token.header.key) {
            return false;
        }

        return this._token.header.key === this._checkApplicationKey(applicationKey);
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

    private _checkApplicationKey(applicationKey?: string): string {

        if (applicationKey) {
            return applicationKey;
        }

        if (this._applicationKey) {
            return this._applicationKey;
        }

        throw panic.code(ERROR_CODE.NEED_APPLICATION_KEY);
    }

    private _checkServer(server?: string): string {

        if (server) {
            return server;
        }

        if (this._server) {
            return this._server;
        }

        throw panic.code(ERROR_CODE.NEED_SERVER_ROUTE);
    }
}
