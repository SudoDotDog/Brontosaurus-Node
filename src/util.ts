/**
 * @author WMXPY
 * @namespace Node
 * @description Util
 */

import { Brontosaurus } from "@brontosaurus/core";
import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";

export type TokenType = {

    header: IBrontosaurusHeader,
    body: IBrontosaurusBody,
};

export const parseToken = (token: string): TokenType | null => {

    const header: IBrontosaurusHeader | null = Brontosaurus.decoupleHeader(token);

    const body: IBrontosaurusBody | null = Brontosaurus.decoupleBody(token);

    if (!body || !header) {
        return null;
    }

    return {
        header,
        body,
    };
};

export const getDefaultServer = (): string | undefined => {

    if (process.env.BRONTOSAURUS_SERVER) {
        return process.env.BRONTOSAURUS_SERVER;
    }
    return;
};

export const getDefaultApplicationKey = (): string | undefined => {

    if (process.env.BRONTOSAURUS_APPLICATION_KEY) {
        return process.env.BRONTOSAURUS_APPLICATION_KEY;
    }
    return;
};
