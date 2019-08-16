/**
 * @author WMXPY
 * @namespace Node
 * @description Util
 */

import { Brontosaurus } from "@brontosaurus/core";
import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import * as Url from "url";
import { AuthorizationToken } from "./declare";

export const joinUrl = (base: string, ...paths: string[]): string => {

    const url: Url.Url = Url.parse(base);
    return `${url.protocol}//${url.host}/` + paths.join('/');
};

export const parseToken = (token: string): AuthorizationToken | null => {

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

export const getDefaultPublicKey = (): string | undefined => {

    if (process.env.BRONTOSAURUS_PUBLIC_KEY) {
        return process.env.BRONTOSAURUS_PUBLIC_KEY;
    }
    return;
};
