/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 * @override Mock
 */

import { Brontosaurus, BrontosaurusKey } from "@brontosaurus/core";
import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import * as Chance from "chance";
import { generateKeyPairSync } from "crypto";

const chance: Chance.Chance = new Chance('mock-token');

export const generateKey = (): BrontosaurusKey => {

    const result = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    } as any);

    return {
        public: result.publicKey,
        private: result.privateKey,
    };
};

export const createMockToken = (
    key: string = chance.string(),
    attempt: string = chance.string(),
): string => {

    const secret: BrontosaurusKey = generateKey();
    const username: string = chance.string();
    const mint: string = chance.string();

    return Brontosaurus.token(secret).sign(key, {
        username,
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
        mint,
        groups: [],
        tags: [],
        infos: {},
        beacons: {},
        modifies: [],
    }).token(attempt);
};

export const createMockOrganizationToken = (
    key: string = chance.string(),
    attempt: string = chance.string(),
): string => {

    const secret: BrontosaurusKey = generateKey();
    const username: string = chance.string();
    const mint: string = chance.string();
    const organization: string = chance.string();

    return Brontosaurus.token(secret).sign(key, {
        username,
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
        organization,
        mint,
        groups: [],
        tags: [],
        organizationTags: [],
        infos: {},
        beacons: {},
        modifies: [],
    }).token(attempt);
};
