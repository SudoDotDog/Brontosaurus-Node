/**
 * @author WMXPY
 * @namespace Example
 * @description Verify
 */

import { Green } from "../src/green";

(async () => {

    const username: string = 'test';
    const organization: string = 'not exist';

    const token: string = process.argv[2];

    const server: string = 'http://localhost:8500';

    try {

        const green: Green = Green.create(token, server);

        console.log('SUCCEED', await green.verifyAccount(username));
        console.log('SUCCEED', await green.verifyOrganization(organization));
    } catch (err) {

        console.log('FAILED', err);
    }
})();
