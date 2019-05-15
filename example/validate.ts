/**
 * @author WMXPY
 * @namespace Example
 * @description Validate
 */

import { validateRepository } from "../src/repository";

(async () => {

    const token: string = process.argv[2];

    const server: string = 'http://localhost:8080';

    try {

        const result: boolean = await validateRepository(server, token);

        console.log('SUCCEED', result);
    } catch (err) {

        console.log('FAILED', err);
    }
})();
