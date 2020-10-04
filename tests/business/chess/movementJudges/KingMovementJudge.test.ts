import KingMovementJudge from '../../../../src/business/chess/movementJudges/KingMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import TestBoardPieceGeometryFactory from '../../../mocks/TestBoardPieceGeometryFactory';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('KingMovementJudge tests', () => {
  let testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
  let pieceGeometry = new Mesh();
  let kingMovementJudge = new KingMovementJudge();

  const validKingMoves = [
    BoardCoordinate.at(3, 3),
    BoardCoordinate.at(3, 4),
    BoardCoordinate.at(3, 5),
    BoardCoordinate.at(4, 5),
    BoardCoordinate.at(5, 5),
    BoardCoordinate.at(5, 4),
    BoardCoordinate.at(5, 3),
    BoardCoordinate.at(4, 3),
  ];

  validKingMoves.forEach((destination) => {
    it(`king can move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let origin = BoardCoordinate.at(4, 4);
      board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));

      expect(kingMovementJudge.isLegalMove(origin, destination, board)).to.be.true;
      expect(kingMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.true;
    })
  });

  const invalidKingMoves = [
    BoardCoordinate.at(1, 3),
    BoardCoordinate.at(2, 8),
    BoardCoordinate.at(1, 6),
    BoardCoordinate.at(7, 6),
    BoardCoordinate.at(3, 2)
  ];

  invalidKingMoves.forEach((destination) => {
    it(`king cannot move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let origin = BoardCoordinate.at(4, 4);
      board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));

      expect(kingMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
      expect(kingMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.false;
    })
  });

  it(`king can castle`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 1);
    let destination = BoardCoordinate.at(2, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
    expect(kingMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it(`king cannot castle with pieces in the way`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 1);
    let destination = BoardCoordinate.at(2, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));
    board.get(destination).setPiece(new BoardPiece("black", BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
    expect(kingMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it(`king cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(3, 4);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));
    board.get(destination).setPiece(new BoardPiece("white", BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
    expect(kingMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it(`king can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(3, 4);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));
    board.get(destination).setPiece(new BoardPiece("black", BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(origin, destination, board)).to.be.true;
    expect(kingMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.true;
  });
});
