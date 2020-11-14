import { ChessStateProcessor } from '../../../src/business/chess/ChessStateProcessor';
import { GameType } from '../../../src/models/enums/GameType';
import { Board } from '../../../src/models/Board';
import { BoardCoordinate } from '../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../src/models/BoardPiece';
import { BoardPieceType } from '../../../src/models/enums/BoardPieceType';
import { TestBoardBuilder } from '../../mocks/TestBoardBuilder';
import { TestMovementJudge } from '../../mocks/TestMovementJudge';
import { Team } from '../../../src/models/enums/Team';

import { Group, Mesh } from 'three'
import { expect } from 'chai';
import 'mocha';

describe('ChessStateProcessor tests', () => {
  it('not in check so game is not over', async () => {
    let sut = new ChessStateProcessor((type: GameType) => (type: BoardPieceType) => new TestMovementJudge(true, true));
    let boardBuilder = new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece | undefined>([
        [BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.King, new Mesh())]
      ]));
    let board = await boardBuilder.createBoard();

    let gameOver = sut.isGameOverForTeam(board, Team.White);

    expect(gameOver).to.be.false;
  });

  it('not in checkmate so game is not over', async () => {
    let sut = new ChessStateProcessor((type: GameType) => (type: BoardPieceType) => new TestMovementJudge(false, false));
    let boardBuilder = new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece | undefined>([
        [BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.King, new Mesh())],
        [BoardCoordinate.at(1, 7), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh())]
      ]));
    let board = await boardBuilder.createBoard();

    let gameOver = sut.isGameOverForTeam(board, Team.White);

    expect(gameOver).to.be.false;
  });

  it('in checkmate so game is over', async () => {
    let sut = new ChessStateProcessor((type: GameType) => (type: BoardPieceType) => new TestMovementJudge(true, true));
    let boardBuilder = new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece | undefined>([
        [BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.King, new Mesh())],
        [BoardCoordinate.at(1, 7), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh())],
        [BoardCoordinate.at(2, 7), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh())]
      ]));
    let board = await boardBuilder.createBoard();

    let gameOver = sut.isGameOverForTeam(board, Team.White);

    expect(gameOver).to.be.true;
  });
});
