/**
 * @author WMXPY
 * @namespace Node
 * @description Green
 */

import { ERROR_CODE, panic } from "./panic";
import { verifyAccountRepository, verifyOrganizationRepository } from "./repository";
import { getDefaultServer } from "./util";

export class Green {

    public static create(
        green: string,
        server: string | undefined = getDefaultServer(),
    ): Green {

        return new Green(green, server);
    }

    private readonly _green: string;
    private readonly _server?: string;

    private constructor(green: string, server?: string) {

        this._green = green;
        this._server = server;
    }

    public async verifyAccount(username: string, server?: string): Promise<boolean> {

        const checkedServer: string = this._checkServer(server);

        return await verifyAccountRepository(
            checkedServer,
            this._green,
            username,
        );
    }

    public async verifyOrganization(organization: string, server?: string): Promise<boolean> {

        const checkedServer: string = this._checkServer(server);

        return await verifyOrganizationRepository(
            checkedServer,
            this._green,
            organization,
        );
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
