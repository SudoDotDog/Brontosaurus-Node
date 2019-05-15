/**
 * @author WMXPY
 * @namespace Node
 * @description Token
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from "chance";
import { AuthToken } from '../../src/token';
import { createMockToken } from '../mock/token';

describe('Given {Token} class', (): void => {

    const chance: Chance.Chance = new Chance('node-token');

    it('should be able to create', (): void => {

        const mockToken = createMockToken();
        const token: AuthToken | null = AuthToken.create(mockToken);

        // tslint:disable-next-line
        expect(token).to.be.exist;
    });
});
