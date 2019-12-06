/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { Brontosaurus, verifyString } from "@brontosaurus/core";
import { Basics, IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe, SafeObject } from "@sudoo/extract";
import { AuthorizationToken } from "./declare";
import { ERROR_CODE, panic } from "./panic";
import { validateRepository } from "./repository";
import { getDefaultApplicationKey, getDefaultPublicKey, getDefaultServer, parseToken } from "./util";

export class AuthToken {

    public static create(
        token: string,
        server: string | undefined = getDefaultServer(),
        applicationKey: string | undefined = getDefaultApplicationKey(),
        publicKey: string | undefined = getDefaultPublicKey(),
    ): AuthToken | null {

        const parsedToken: AuthorizationToken | null = parseToken(token);

        if (!parsedToken) {
            return null;
        }

        return new AuthToken(token, parsedToken, server, applicationKey, publicKey);
    }

    private readonly _raw: string;
    private readonly _token: AuthorizationToken;
    private readonly _server?: string;
    private readonly _applicationKey?: string;
    private readonly _publicKey?: string;

    private constructor(
        raw: string,
        token: AuthorizationToken,
        server?: string,
        applicationKey?: string,
        publicKey?: string,
    ) {

        this._raw = raw;
        this._token = token;
        this._server = server;
        this._applicationKey = applicationKey;
        this._publicKey = publicKey;
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

    public get groups(): string[] {
        return this.body.groups;
    }
    public get mint(): string {
        return this.body.mint;
    }
    public get infos(): Record<string, Basics> {
        return this.body.infos;
    }
    public get beacons(): Record<string, Basics> {
        return this.body.beacons;
    }
    public get username(): string {
        return this.body.username;
    }
    public get displayName(): string | undefined {
        const displayName: string | undefined = this.body.displayName;
        return displayName;
    }
    public get email(): string | undefined {
        return this.body.email;
    }
    public get name(): string {
        if (this.body.displayName) {
            return this.body.displayName;
        }
        return this.body.username;
    }
    public get organization(): string | undefined {
        return this.body.organization;
    }
    public get tags(): string[] {
        return this.body.tags;
    }
    public get organizationTags(): string[] | undefined {
        return this.body.organizationTags;
    }
    public get combineTags(): string[] {
        return [...this.body.tags, ...(this.body.organizationTags || [])];
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

    public verify(publicKey?: string): boolean {

        const parts: [string, string, string] | null = Brontosaurus.decouple(this._raw);

        if (!parts) {
            return false;
        }

        const body: string = parts[0] + '.' + parts[1];
        const key: string = parts[2];

        const checked: string = this._checkPublicKey(publicKey);

        return verifyString(body, key, checked);
    }

    public authenticate(
        clockTime: number = Date.now(),
        applicationKey?: string,
        publicKey?: string,
    ): boolean {

        if (!this.clock(clockTime)) {
            return false;
        }

        if (!this.match(applicationKey)) {
            return false;
        }

        return this.verify(publicKey);
    }

    public async secureAuthenticate(
        clockTime: number = Date.now(),
        applicationKey?: string,
        publicKey?: string,
        server?: string,
    ): Promise<boolean> {

        if (!this.authenticate(clockTime, applicationKey, publicKey)) {
            return false;
        }

        return await this.validate(server);
    }

    public async validate(server?: string): Promise<boolean> {

        const checked: string = this._checkServer(server);

        return await validateRepository(
            checked,
            this._raw,
        );
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

    public hasNoGroups(...groups: string[]): boolean {

        return !this.hasOneOfGroups(...groups);
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

    private _checkPublicKey(publicKey?: string): string {

        if (publicKey) {
            return publicKey;
        }

        if (this._publicKey) {
            return this._publicKey;
        }

        throw panic.code(ERROR_CODE.NEED_PUBLIC_KEY);
    }
}
