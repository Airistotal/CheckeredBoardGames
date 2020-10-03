import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import TestBoardPieceGeometryFactory from '../mocks/TestBoardPieceGeometryFactory';

import { expect } from 'chai';
import { Vec2 } from 'three';
import 'mocha';

describe('BoardPiece tests', () => {
  let testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
  let pieceGeometry = testBoardPieceGeometryFactory.createGeometryFor(BoardPieceType.Pawn);

	it('create with correct properties', () => {
		let boardPiece = new BoardPiece("team", BoardPieceType.Pawn, pieceGeometry);

		expect(boardPiece.team).to.eql("team");
    expect(boardPiece.type).to.eql(BoardPieceType.Pawn);
	});

  it('create with unique ids', () => {
    let boardPiece = new BoardPiece("team", BoardPieceType.Pawn, pieceGeometry);
    let boardPiece2 = new BoardPiece("team", BoardPieceType.Pawn, pieceGeometry);

    expect(boardPiece.id).to.not.equal(boardPiece2.id);
  });

  it('create with mesh', () => {
    let boardPiece = new BoardPiece("team", BoardPieceType.Pawn, pieceGeometry);

    expect(boardPiece.getRenderablePiece()).to.not.be.null;
    expect(boardPiece.getRenderablePiece()).to.not.be.undefined;
  });
});