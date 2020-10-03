import RookMovementJudge from '../../../../src/business/chess/movementJudges/RookMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import TestBoardPieceGeometryFactory from '../../../mocks/TestBoardPieceGeometryFactory';

import { expect } from 'chai';
import 'mocha';

describe('RookMovementJudge tests', () => {
  let testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
  let pieceGeometry = testBoardPieceGeometryFactory.createGeometryFor(BoardPieceType.Pawn);

  const validRookMoves = [
    BoardCoordinate.at(1, 4),
    BoardCoordinate.at(2, 4),
    BoardCoordinate.at(3, 4),
    BoardCoordinate.at(5, 4),
    BoardCoordinate.at(6, 4),
    BoardCoordinate.at(7, 4),
    BoardCoordinate.at(8, 4),
    BoardCoordinate.at(4, 8),
    BoardCoordinate.at(4, 7),
    BoardCoordinate.at(4, 6),
    BoardCoordinate.at(4, 5),
    BoardCoordinate.at(4, 3),
    BoardCoordinate.at(4, 2),
    BoardCoordinate.at(4, 1),
  ];

  validRookMoves.forEach((destination) => {
    it(`rook can move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let origin = BoardCoordinate.at(4, 4);
      board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));

      expect(new RookMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
      expect(new RookMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
    })
  });

  const invalidRookMoves = [
    BoardCoordinate.at(1, 3),
    BoardCoordinate.at(2, 8),
    BoardCoordinate.at(3, 5),
    BoardCoordinate.at(7, 6),
    BoardCoordinate.at(6, 1)
  ];

  invalidRookMoves.forEach((destination) => {
    it(`rook cannot move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let origin = BoardCoordinate.at(4, 4);
      board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));

      expect(new RookMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
      expect(new RookMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
    })
  });

  it(`rook cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(4, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));
    board.get(BoardCoordinate.at(4, 2)).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));
    board.get(BoardCoordinate.at(4, 3)).setPiece(new BoardPiece("black", BoardPieceType.Rook, pieceGeometry));

    expect(new RookMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new RookMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it(`rook cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(4, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));
    board.get(destination).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));

    expect(new RookMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new RookMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it(`rook can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(4, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry));
    board.get(destination).setPiece(new BoardPiece("black", BoardPieceType.Rook, pieceGeometry));

    expect(new RookMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
    expect(new RookMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });
});
