import BoardTile from '../../src/models/BoardTile';
import BoardPiece from '../../src/models/BoardPiece';
import { expect } from 'chai';
import { Color } from 'three';
import 'mocha';

describe('BoardTile tests', () => {
	it('create with correct properties', () => {
		let boardTile = new BoardTile(new Color("white"), undefined);

		expect(boardTile.GetPiece()).to.be.undefined;
		expect(boardTile.GetColor()).to.be.equal(new Color("white"));
	});

	it('can change piece', () => {
		let boardTile = new BoardTile(new Color("white"), undefined);
		let boardPiece = new BoardPiece("knight");

		boardTile.SetPiece(boardPiece);
		let piece = boardTile.GetPiece();

		expect(piece).to.not.be.undefined;
		if (piece === undefined) return;
		expect(piece.name).to.eql("knight");
	});
});