import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import { expect } from 'chai';
import { Vec2 } from 'three';
import 'mocha';

describe('BoardPiece tests', () => {
	it('create with correct properties', () => {
		let boardPiece = new BoardPiece("team", BoardPieceType.Pawn);

		expect(boardPiece.team).to.eql("team");
    expect(boardPiece.type).to.eql(BoardPieceType.Pawn);
	});

  it('create with unique ids', () => {
    let boardPiece = new BoardPiece("team", BoardPieceType.Pawn);
    let boardPiece2 = new BoardPiece("team", BoardPieceType.Pawn);

    expect(boardPiece.id).to.not.equal(boardPiece2.id);
  });

  it('create with mesh', () => {
    let boardPiece = new BoardPiece("team", BoardPieceType.Pawn);

    expect(boardPiece.getRenderablePiece()).to.not.be.null;
    expect(boardPiece.getRenderablePiece()).to.not.be.undefined;
  });
});