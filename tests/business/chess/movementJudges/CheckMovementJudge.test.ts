import CheckMovementJudge from '../../../../src/business/chess/movementJudges/CheckMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import GameType from '../../../../src/models/enums/GameType';
import Team from '../../../../src/models/enums/Team';
import MovementData from '../../../../src/models/MovementData';
import TestMovementJudge from '../../../mocks/TestMovementJudge';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('CheckMovementJudge tests', async () => {
  let checkMovementJudge = new CheckMovementJudge((type: GameType) => (type: BoardPieceType) => new TestMovementJudge(true, true));

  it('Origin piece moves and doesn\'t put own king in check can move', () => {
    let board = new Board(8, 8);
    board.get(BoardCoordinate.at(1, 2)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.get(BoardCoordinate.at(1, 1)).setPiece(new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.get(BoardCoordinate.at(2, 3)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));

    let mvDta = new MovementData(
      BoardCoordinate.at(1, 1),
      BoardCoordinate.at(2, 1),
      board,
      new Array<BoardCoordinate>(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 1)),
      new Array<BoardCoordinate>(BoardCoordinate.at(2, 3)));

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.true;
  });

  it('Origin piece moves and own king in check can\'t move', () => {
    let board = new Board(8, 8);
    board.get(BoardCoordinate.at(1, 2)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.get(BoardCoordinate.at(1, 1)).setPiece(new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.get(BoardCoordinate.at(3, 2)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));

    let mvDta = new MovementData(
      BoardCoordinate.at(1, 2),
      BoardCoordinate.at(1, 1),
      board,
      new Array<BoardCoordinate>(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 1)),
      new Array<BoardCoordinate>(BoardCoordinate.at(2, 3)));

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.false;
  });

  it('King moves into check can\'t move', () => {
    let board = new Board(8, 8);
    board.get(BoardCoordinate.at(1, 1)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.get(BoardCoordinate.at(1, 8)).setPiece(new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.get(BoardCoordinate.at(3, 2)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));

    let mvDta = new MovementData(
      BoardCoordinate.at(1, 1),
      BoardCoordinate.at(1, 2),
      board,
      new Array<BoardCoordinate>(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 1)),
      new Array<BoardCoordinate>(BoardCoordinate.at(2, 3)));

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.false;
  });

  it('King moves out of check can move', () => {
    let board = new Board(8, 8);
    board.get(BoardCoordinate.at(1, 2)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.get(BoardCoordinate.at(1, 1)).setPiece(new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.get(BoardCoordinate.at(3, 2)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));
    
    let mvDta = new MovementData(
      BoardCoordinate.at(1, 1),
      BoardCoordinate.at(1, 2),
      board,
      new Array<BoardCoordinate>(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 1)),
      new Array<BoardCoordinate>(BoardCoordinate.at(2, 3)));

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.true;
  });
});