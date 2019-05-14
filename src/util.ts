/**
 * @author WMXPY
 * @namespace Node
 * @description Util
 */

import { Brontosaurus } from "@brontosaurus/core";
import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe } from "@sudoo/extract";
import { SafeToken } from "./declare";

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

export const getDefaultServer = (): string | undefined => {

    return;
};
