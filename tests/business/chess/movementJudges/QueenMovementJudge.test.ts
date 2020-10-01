import QueenMovementJudge from '../../../../src/business/chess/movementJudges/QueenMovementJudge';
import RookMovementJudge from '../../../../src/business/chess/movementJudges/RookMovementJudge';
import BishopMovementJudge from '../../../../src/business/chess/movementJudges/BishopMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';

import { expect } from 'chai';
import 'mocha';

describe('QueenMovementJudge tests', () => {
  let queenMovementJudge = new QueenMovementJudge(new BishopMovementJudge(), new RookMovementJudge());

  const validQueenMoves = [
    BoardCoordinate.at(1, 1),
    BoardCoordinate.at(2, 2),
    BoardCoordinate.at(3, 3),
    BoardCoordinate.at(5, 5),
    BoardCoordinate.at(6, 6),
    BoardCoordinate.at(7, 7),
    BoardCoordinate.at(8, 8),
    BoardCoordinate.at(1, 7),
    BoardCoordinate.at(2, 6),
    BoardCoordinate.at(3, 5),
    BoardCoordinate.at(5, 3),
    BoardCoordinate.at(6, 2),
    BoardCoordinate.at(7, 1),
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

  validQueenMoves.forEach((destination) => {
    it(`queen can move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let origin = BoardCoordinate.at(4, 4);
      board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Queen));

      debugger;

      expect(queenMovementJudge.isLegalMove(origin, destination, board)).to.be.true;
      expect(queenMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.true;
    })
  });

  const invalidQueenMoves = [
    BoardCoordinate.at(1, 3),
    BoardCoordinate.at(2, 8),
    BoardCoordinate.at(1, 6),
    BoardCoordinate.at(7, 6),
    BoardCoordinate.at(6, 1)
  ];

  invalidQueenMoves.forEach((destination) => {
    it(`queen cannot move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let origin = BoardCoordinate.at(4, 4);
      board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Queen));

      expect(queenMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
      expect(queenMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.false;
    })
  });

  it(`queen cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Queen));
    board.get(BoardCoordinate.at(2, 2)).SetPiece(new BoardPiece("white", BoardPieceType.Bishop));

    expect(queenMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
    expect(queenMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it(`queen cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Queen));
    board.get(destination).SetPiece(new BoardPiece("white", BoardPieceType.Bishop));

    expect(queenMovementJudge.isLegalMove(origin, destination, board)).to.be.false;
    expect(queenMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it(`queen can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Queen));
    board.get(destination).SetPiece(new BoardPiece("black", BoardPieceType.Bishop));

    expect(queenMovementJudge.isLegalMove(origin, destination, board)).to.be.true;
    expect(queenMovementJudge.isLegalFirstMove(origin, destination, board)).to.be.true;
  });
});
