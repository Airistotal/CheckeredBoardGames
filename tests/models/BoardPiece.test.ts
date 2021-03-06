import { BoardPiece } from '../../src/models/BoardPiece';
import { BoardPieceType } from '../../src/models/enums/BoardPieceType';
import { TestBoardPieceGeometryBuilder } from '../mocks/TestBoardPieceGeometryBuilder';
import { Team } from '../../src/models/enums/Team';

import { expect } from 'chai';
import { Vec2, Mesh } from 'three';
import 'mocha';

describe('BoardPiece tests', () => {
  let testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
  let pieceGeometry = new Mesh();

	it('create with correct properties', () => {
		let boardPiece = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);

		expect(boardPiece.team).to.eql(Team.White);
    expect(boardPiece.type).to.eql(BoardPieceType.Pawn);
	});

  it('create with unique ids', () => {
    let boardPiece = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let boardPiece2 = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);

    expect(boardPiece.id).to.not.equal(boardPiece2.id);
  });

  it('create with mesh', () => {
    let boardPiece = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);

    expect(boardPiece.getRenderablePiece()).to.not.be.null;
    expect(boardPiece.getRenderablePiece()).to.not.be.undefined;
  });
});