/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe, SafeObject } from "@sudoo/extract";
import { AuthorizationToken } from "./declare";
import { ERROR_CODE, panic } from "./panic";
import { validateRepository } from "./repository";
import { getDefaultApplicationKey, getDefaultServer, parseToken } from "./util";

export class AuthToken {

    public static create(
        token: string,
        server: string | undefined = getDefaultServer(),
        applicationKey: string | undefined = getDefaultApplicationKey(),
    ): AuthToken | null {

        const parsedToken: AuthorizationToken | null = parseToken(token);

        if (!parsedToken) {
            return null;
        }

        return new AuthToken(token, parsedToken, server, applicationKey);
    }

    private readonly _raw: string;
    private readonly _token: AuthorizationToken;
    private readonly _server?: string;
    private readonly _applicationKey?: string;

    private constructor(raw: string, token: AuthorizationToken, server?: string, applicationKey?: string) {

        this._raw = raw;
        this._token = token;
        this._server = server;
        this._applicationKey = applicationKey;
    }

    public get raw(): string {
        return this._raw;
    }
    public get token(): AuthorizationToken {
        return this._token;
    }
    public get header(): IBrontosaurusHeader {
        return this._token.header;
    }
    public get body(): IBrontosaurusBody {
        return this._token.body;
    }
    public get safeHeader(): SafeObject<IBrontosaurusHeader> {
        return Safe.object(this._token.header);
    }
    public get safeBody(): SafeObject<IBrontosaurusBody> {
        return Safe.object(this._token.body);
    }

    public match(applicationKey?: string): boolean {

        if (!this._token.header.key) {
            return false;
        }

        const checkedApplicationKey: string = this._checkApplicationKey(applicationKey);

        return this._token.header.key === checkedApplicationKey;
    }

    public clock(time: number = Date.now()): boolean {

        if (!this._token.header.expireAt) {
            return false;
        }

        return this._token.header.expireAt > time;
    }

    public async validate(server?: string): Promise<boolean> {

        const checked: string = this._checkServer(server);

        return await validateRepository(
            checked,
            this._raw,
        );
    }

    public async authenticate(
        clockTime: number = Date.now(),
        applicationKey?: string,
        server?: string,
    ): Promise<boolean> {

        if (!this.clock(clockTime)) {
            return false;
        }

        if (!this.match(applicationKey)) {
            return false;
        }

        const validationResult: boolean = await this.validate(server);
        return validationResult;
    }

    public hasGroups(...groups: string[]): boolean {

        const userGroups: string[] = this.body.groups;

        for (const group of groups) {
            if (!userGroups.includes(group)) {
                return false;
            }
        }
        return true;
    }

    public hasOneOfGroups(...groups: string[]): boolean {

        const userGroups: string[] = this.body.groups;

        for (const group of groups) {
            if (userGroups.includes(group)) {
                return true;
            }
        }
        return false;
    }

    public accountHasTags(...tags: string[]): boolean {

        const userTags: string[] = this.body.tags;

        for (const tag of tags) {
            if (!userTags.includes(tag)) {
                return false;
            }
        }
        return true;
    }

    public accountHasOneOfTags(...tags: string[]): boolean {

        const userTags: string[] = this.body.tags;

        for (const tag of tags) {
            if (userTags.includes(tag)) {
                return true;
            }
        }
        return false;
    }

    public organizationHasTags(...tags: string[]): boolean {

        const organizationTags: string[] | undefined = this.body.organizationTags;

        if (!organizationTags) {
            return false;
        }

        for (const tag of tags) {
            if (!organizationTags.includes(tag)) {
                return false;
            }
        }
        return true;
    }

    public organizationHasOneOfTags(...tags: string[]): boolean {

        const organizationTags: string[] | undefined = this.body.organizationTags;

        if (!organizationTags) {
            return false;
        }

        for (const tag of tags) {
            if (organizationTags.includes(tag)) {
                return true;
            }
        }
        return false;
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
