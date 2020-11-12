import KnightMovementJudge from '../../../../src/business/chess/movementJudges/KnightMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import MovementData from '../../../../src/models/MovementData';
import TestBoardPieceGeometryBuilder from '../../../mocks/TestBoardPieceGeometryBuilder';
import Team from '../../../../src/models/enums/Team';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('KnightMovementJudge tests', () => {
  let testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
  let pieceGeometry = new Mesh();

	const validKnightMoves = [
    BoardCoordinate.at(2, 3),
    BoardCoordinate.at(2, 5),
    BoardCoordinate.at(6, 3),
    BoardCoordinate.at(6, 5),
    BoardCoordinate.at(3, 2),
    BoardCoordinate.at(3, 6),
    BoardCoordinate.at(5, 2),
    BoardCoordinate.at(5, 6)
  ];

  validKnightMoves.forEach((destination) => {
  	it(`knight can move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let knight = new BoardPiece(Team.White, BoardPieceType.Knight, pieceGeometry);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), destination, board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), destination, board, new Array<string>(knight.id));
      board.get(mvDta.origin).setPiece(knight);

	    expect(new KnightMovementJudge().isLegalMove(mvDta)).to.be.true;
      expect(new KnightMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  	})
  });

  const invalidKnightMoves = [
    BoardCoordinate.at(3, 3),
    BoardCoordinate.at(2, 2),
    BoardCoordinate.at(1,1),
    BoardCoordinate.at(5, 5),
    BoardCoordinate.at(4, 2),
    BoardCoordinate.at(4, 4)
  ];

  invalidKnightMoves.forEach((destination) => {
  	it(`knight cannot move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let knight = new BoardPiece(Team.White, BoardPieceType.Knight, pieceGeometry);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), destination, board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), destination, board, new Array<string>(knight.id));
      board.get(mvDta.origin).setPiece(knight);

      expect(new KnightMovementJudge().isLegalMove(mvDta)).to.be.false;
      expect(new KnightMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  	})
  });

  it('knight can capture opposite color piece', () => {
      let board = new Board(8, 8);
      let knight = new BoardPiece(Team.White, BoardPieceType.Knight, pieceGeometry);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(3, 2), board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(3, 2), board, new Array<string>(knight.id));
      board.get(mvDta.origin).setPiece(knight);
      board.get(mvDta.destination).setPiece(new BoardPiece(Team.Black, BoardPieceType.Bishop, pieceGeometry));

      expect(new KnightMovementJudge().isLegalMove(mvDta)).to.be.true;
      expect(new KnightMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  })

  it('knight cannot capture same color piece', () => {
      let board = new Board(8, 8);
      let knight = new BoardPiece(Team.White, BoardPieceType.Knight, pieceGeometry);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(3, 2), board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(3, 2), board, new Array<string>(knight.id));
      board.get(mvDta.origin).setPiece(knight);
      board.get(mvDta.destination).setPiece(new BoardPiece(Team.White, BoardPieceType.Bishop, pieceGeometry));

      expect(new KnightMovementJudge().isLegalMove(mvDta)).to.be.false;
      expect(new KnightMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  })
});
