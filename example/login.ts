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

    const server: string = 'localhost:8080';
    const response = await loginRepository(server, username, password, applicationKey);

    console.log(response);
})();
