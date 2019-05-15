/**
 * @author WMXPY
 * @namespace Node
 * @description Agent
 */

import { ERROR_CODE, panic } from "./panic";
import { loginRepository } from "./repository";
import { getDefaultApplicationKey, getDefaultServer } from "./util";

export class AuthAgent {

    public static create(
        server: string | undefined = getDefaultServer(),
        applicationKey: string | undefined = getDefaultApplicationKey(),
    ) {

        return new AuthAgent(server, applicationKey);
    }

    private readonly _server?: string;
    private readonly _applicationKey?: string;

    private constructor(server?: string, applicationKey?: string) {

        this._server = server;
        this._applicationKey = applicationKey;
    }

    public async login(username: string, password: string, server?: string, applicationKey?: string): Promise<string> {

        const checkedServer: string = this._checkServer(server);
        const checkedApplicationKey: string = this._checkApplicationKey(applicationKey);

        return await loginRepository(
            checkedServer,
            username,
            password,
            checkedApplicationKey,
        );
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
