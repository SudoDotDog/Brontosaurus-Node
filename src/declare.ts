/**
 * @author WMXPY
 * @namespace Node
 * @description Declare
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";

export type AuthorizationToken = {

    header: IBrontosaurusHeader,
    body: IBrontosaurusBody,
};
