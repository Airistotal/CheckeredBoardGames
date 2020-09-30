import BoardPiece from '../../src/models/BoardPiece';
import { expect } from 'chai';
import 'mocha';

describe('BoardPiece tests', () => {
	it('create with correct properties', () => {
		let boardPiece = new BoardPiece("name");

		expect(boardPiece.name).to.eql("name");
	});
});