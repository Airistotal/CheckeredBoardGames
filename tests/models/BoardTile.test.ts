import BoardTile from '../../src/models/BoardTile';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import { expect } from 'chai';
import { Color } from 'three';
import 'mocha';

describe('BoardTile tests', () => {
	it('create with correct properties', () => {
		let boardTile = new BoardTile(new Color("white"), undefined);

		expect(boardTile.GetPiece()).to.be.undefined;
		expect(boardTile.GetColor().equals(new Color("white"))).to.be.true;
	});

	it('can change piece', () => {
		let boardTile = new BoardTile(new Color("white"), undefined);
		let boardPiece = new BoardPiece("team a", BoardPieceType.Knight);

		boardTile.SetPiece(boardPiece);
		let piece = boardTile.GetPiece();

		expect(piece).to.not.be.undefined;
		if (piece === undefined) return;
		expect(piece.team).to.eql("team a");
	});
});