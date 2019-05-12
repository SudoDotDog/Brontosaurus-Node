/**
 * @author WMXPY
 * @namespace Brontosaurus_Mint_Util
 * @description Auth
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from "chance";

describe('Placeholder', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('Placeholder', (): void => {

        const salt: string = chance.string();

        expect(salt).to.be.equal(salt);
    });
});
