/**
 * @author WMXPY
 * @namespace Node
 * @description Panic
 */

import { Panic } from 'connor';

export const MODULE_NAME = 'Brontosaurus-Node';

export enum ERROR_CODE {

    NEED_APPLICATION_KEY = 2001,
    NEED_SERVER_ROUTE = 2002,

    EXTERNAL_REQUEST_FAILED = 3004,
    INTERNAL_REQUEST_FAILED = 3005,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.NEED_APPLICATION_KEY]: 'Need application key',
    [ERROR_CODE.NEED_SERVER_ROUTE]: 'Need server route',

    [ERROR_CODE.EXTERNAL_REQUEST_FAILED]: 'Request failed, by: "{}"',
    [ERROR_CODE.INTERNAL_REQUEST_FAILED]: 'Did not get correct response',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
