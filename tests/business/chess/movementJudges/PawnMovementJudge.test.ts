import PawnMovementJudge from '../../../../src/business/chess/movementJudges/PawnMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';

import { expect } from 'chai';
import 'mocha';

describe('PawnMovementJudge tests', () => {
  it('pawn can move forward one', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 3);

    debugger;

    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it('pawn cannot move forward one if blocked', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 3);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));
    board.get(destination).setPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('pawn can move forward two on first move', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 4);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it('pawn cannot move forward two after first move', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 3);
    let destination = BoardCoordinate.at(1, 5);

    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
  });

  it('pawn cannot move forward two if blocked', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 4);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));
    board.get(BoardCoordinate.at(1, 3)).setPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('pawn can capture diagonally', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(2, 3);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));
    board.get(destination).setPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it('pawn cannot capture same team diagonally', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(2, 3);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));
    board.get(destination).setPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('pawn cannot move diagonally', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(2, 3);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('white pawn does not move down', function() {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('black pawn does not move up', function() {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 3);
    board.get(origin).setPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new PawnMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new PawnMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });
});
