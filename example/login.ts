/**
 * @author WMXPY
 * @namespace Example
 * @description Login
 */

import { loginRepository } from "../src/repository";

(async () => {

    const username: string = 'test';
    const password: string = 'test';
    const applicationKey: string = 'BRONTOSAURUS_RED';

    const server: string = 'http://localhost:8080';

    try {

        const response = await loginRepository(server, username, password, applicationKey);

        console.log('SUCCEED', response);
    } catch (err) {

        console.log('FAILED', err);
    }
})();
