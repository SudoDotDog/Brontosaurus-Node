/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 */

import { getDefaultServer } from "./util";

export class Token {

    public static create(token: string, server: string = getDefaultServer()) {

        return new Token();
    }

    private constructor() {

    }
}

