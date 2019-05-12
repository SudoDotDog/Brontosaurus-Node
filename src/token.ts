/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { Brontosaurus } from "@brontosaurus/core";
import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe, SafeObject } from "@sudoo/extract";

export type SafeToken = {

    readonly header: SafeObject<IBrontosaurusHeader>;
    readonly body: SafeObject<IBrontosaurusBody>;
};

export const parseToken = (token: string): SafeToken => {

    const header: IBrontosaurusHeader | null = Brontosaurus.decoupleHeader(token);

    // if (!header) {
    //     throw createError(ERROR_CODE.TOKEN_DOES_NOT_CONTAIN_HEADER);
    // }

    const body: IBrontosaurusBody | null = Brontosaurus.decoupleBody(token);

    // if (!body) {
    //     throw createError(ERROR_CODE.TOKEN_DOES_NOT_CONTAIN_BODY);
    // }

    return {
        header: Safe.object(header),
        body: Safe.object(body),
    };
};
