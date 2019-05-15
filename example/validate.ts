/**
 * @author WMXPY
 * @namespace Example
 * @description Validate
 */

import * as Chance from "chance";
import { createMockToken } from "../test/mock/token";

(async () => {

    const chance: Chance.Chance = new Chance('example-validate');

    const applicationKey: string = chance.string();
    const token: string = createMockToken(applicationKey);
})();
