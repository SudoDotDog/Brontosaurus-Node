/**
 * @author WMXPY
 * @namespace Node
 * @description Util
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from "chance";
import { joinUrl } from '../../src/util';

describe('Given [Util] helper functions', (): void => {

    const chance: Chance.Chance = new Chance('node-util');

    it('should be able to join url with port', (): void => {

        const base: string = 'http://localhost:8080';
        const result: string = joinUrl(base);

        expect(result).to.be.equal('http://localhost:8080/');
    });

    it('should be able to join url with query', (): void => {

        const host: string = chance.word();
        const base: string = `http://${host}.com/`;
        const result: string = joinUrl(base);

        expect(result).to.be.equal(`http://${host}.com/`);
    });

    it('should be able to join url', (): void => {

        const host: string = chance.word();
        const base: string = `http://${host}.com/?${chance.word()}=${chance.word()}`;
        const result: string = joinUrl(base);

        expect(result).to.be.equal(`http://${host}.com/`);
    });
});
