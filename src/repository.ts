/**
 * @author WMXPY
 * @namespace Node
 * @description Repository
 */

import * as Request from "request";
import * as Url from "url";

export const validateRepository = (server: string, token: string): Promise<boolean> => {

    return new Promise<boolean>((resolve: (result: boolean) => void, reject: (reason: any) => void) => {

        const route: string = Url.resolve(server, '/validate');
        const options: Request.Options = {
            uri: route,
            method: 'POST',
            json: {
                token,
            },
        };

        Request(options, (error: any, response: Request.Response, body: any) => {

            if (error || response.statusCode !== 200) {
                reject(error);
            }

            resolve(body);
        });
    });
};
