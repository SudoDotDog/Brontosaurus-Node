/**
 * @author WMXPY
 * @namespace Node
 * @description Declare
 */

import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { SafeObject } from "@sudoo/extract";

export type SafeToken = {

    readonly header: SafeObject<IBrontosaurusHeader>;
    readonly body: SafeObject<IBrontosaurusBody>;
};
