/**
 * @author WMXPY
 * @namespace Node
 * @description Repository
 */

import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import * as Request from "request";
import * as Url from "url";
import { ERROR_CODE, panic } from "./panic";

export const loginRepository = (
    server: string,
    username: string,
    password: string,
    applicationKey: string,
): Promise<string> => {

    return new Promise<string>((resolve: (result: string) => void, reject: (reason: any) => void) => {

        const route: string = Url.resolve(server, '/retrieve');
        const options: Request.Options = {
            uri: route,
            method: 'POST',
            json: {
                username,
                password,
                applicationKey,
            },
        };

        Request(options, (error: any, response: Request.Response, body: {
            readonly token: string;
        }) => {

            if (error) {
                reject(panic.code(ERROR_CODE.EXTERNAL_REQUEST_FAILED, error.toString()));
            }

            if (response.statusCode !== HTTP_RESPONSE_CODE.OK) {
                reject(panic.code(ERROR_CODE.EXTERNAL_REQUEST_FAILED, response.statusCode.toString()));
            }

            if (!body.token) {
                reject(panic.code(ERROR_CODE.INTERNAL_REQUEST_FAILED));
            }

            resolve(body.token);
        });
    });
};

export const validateRepository = (server: string, token: string): Promise<boolean> => {

    return new Promise<boolean>((resolve: (result: boolean) => void) => {

        const route: string = Url.resolve(server, '/validate');
        const options: Request.Options = {
            uri: route,
            method: 'POST',
            json: {
                token,
            },
        };

        Request(options, (error: any, response: Request.Response, body: any) => {

            if (error) {
                resolve(false);
            }

            if (response.statusCode !== HTTP_RESPONSE_CODE.OK) {
                resolve(false);
            }

            resolve(body);
        });
    });
};

export const verifyAccountRepository = (server: string, green: string, account: string): Promise<boolean> => {

    return new Promise<boolean>((resolve: (result: boolean) => void) => {

        const route: string = Url.resolve(server, '/account/verify/' + account);
        const options: Request.Options = {
            uri: route,
            method: 'GET',
            headers: {
                authorization: 'bearer ' + green,
            },
            json: {},
        };

        Request(options, (error: any, response: Request.Response, body: {
            valid: boolean;
            account: {
                username: string;
                displayName: string;
            };
        }) => {

            if (error) {
                resolve(false);
            }

            if (response.statusCode !== HTTP_RESPONSE_CODE.OK) {
                resolve(false);
            }

            resolve(body.valid);
        });
    });
};

export const verifyOrganizationRepository = (server: string, green: string, organization: string): Promise<boolean> => {

    return new Promise<boolean>((resolve: (result: boolean) => void) => {

        const route: string = Url.resolve(server, '/organization/verify/' + organization);
        const options: Request.Options = {
            uri: route,
            method: 'GET',
            headers: {
                authorization: 'bearer ' + green,
            },
            json: {},
        };

        Request(options, (error: any, response: Request.Response, body: {
            valid: boolean;
            organization: {
                name: string;
            };
        }) => {

            if (error) {
                resolve(false);
            }

            if (response.statusCode !== HTTP_RESPONSE_CODE.OK) {
                resolve(false);
            }

            resolve(body.valid);
        });
    });
};
