/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 * @override Mock
 */

import { Brontosaurus } from "@brontosaurus/core";
import * as Chance from "chance";

const chance: Chance.Chance = new Chance('mock-token');

export const createMockToken = (key: string = chance.string()): string => {

    const secret: string = chance.string();
    const username: string = chance.string();
    const mint: string = chance.string();

    return Brontosaurus.token(secret).sign(key, {
        username,
        mint,
        groups: [],
        infos: {},
        beacons: {},
    }).token();
};
