import ChessMovementJudge from '../../../src/business/chess/movementJudges/ChessMovementJudge';
import BoardCoordinate from '../../../src/models/BoardCoordinate';
import BoardPiece from '../../../src/models/BoardPiece';
import BoardPieceType from '../../../src/models/enums/BoardPieceType';
import Board from '../../../src/models/Board';

import { expect } from 'chai';
import 'mocha';

describe('ChessMovementJudge pawn tests', () => {
  it('pawn can move forward one', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 3);
    board.get(origin).SetPiece(new BoardPiece("pawn", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it('pawn cannot move forward one if blocked', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 3);
    board.get(origin).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));
    board.get(destination).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('pawn can move forward two on first move', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 4);
    board.get(origin).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it('pawn cannot move forward two after first move', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 3);
    let destination = BoardCoordinate.at(1, 5);

    board.get(origin).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
  });

  it('pawn cannot move forward two if blocked', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(1, 4);
    board.get(origin).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));
    board.get(BoardCoordinate.at(1, 3)).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('pawn can capture diagonally', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(2, 3);
    board.get(origin).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));
    board.get(destination).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));

    debugger;

    expect(new ChessMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  });

  it('pawn cannot capture same team diagonally', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(2, 3);
    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));
    board.get(destination).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });

  it('pawn cannot move diagonally', () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(1, 2);
    let destination = BoardCoordinate.at(2, 3);
    board.get(origin).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));

    expect(new ChessMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new ChessMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  });
});
