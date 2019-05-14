/**
 * @author WMXPY
 * @namespace Node
 * @description Util
 */

import { Brontosaurus } from "@brontosaurus/core";
import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { Safe } from "@sudoo/extract";
import { SafeToken } from "./declare";

export const parseToken = (token: string): SafeToken | null => {

    const header: IBrontosaurusHeader | null = Brontosaurus.decoupleHeader(token);

    const body: IBrontosaurusBody | null = Brontosaurus.decoupleBody(token);

    if (!body || !header) {
        return null;
    }

    return {
        header: Safe.object(header),
        body: Safe.object(body),
    };
};

export const getDefaultServer = (): string | undefined => {

    return;
};
