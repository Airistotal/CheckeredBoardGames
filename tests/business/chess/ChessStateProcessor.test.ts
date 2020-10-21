import ChessStateProcessor from '../../../src/business/chess/ChessStateProcessor';
import Board from '../../../src/models/Board';
import BoardCoordinate from '../../../src/models/BoardCoordinate';
import BoardPiece from '../../../src/models/BoardPiece';
import BoardPieceType from '../../../src/models/enums/BoardPieceType';
import TestBoardBuilder from '../../mocks/TestBoardBuilder';

import { Group, Mesh } from 'three'
import { expect } from 'chai';
import 'mocha';

describe('ChessStateProcessor tests', () => {
  it('not in check so game is not over', async () => {
    let sut = new ChessStateProcessor();
    let boardBuilder = new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece | undefined>([
        [BoardCoordinate.at(1, 1), new BoardPiece("white", BoardPieceType.King, new Mesh())]
      ]));
    let board = await boardBuilder.createBoard();

    let gameOver = sut.isGameOver(board);

    expect(gameOver).to.be.false;
  });

  it('not in checkmate so game is not over', async () => {
    let sut = new ChessStateProcessor();
    let boardBuilder = new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece | undefined>([
        [BoardCoordinate.at(1, 1), new BoardPiece("white", BoardPieceType.King, new Mesh())],
        [BoardCoordinate.at(1, 7), new BoardPiece("black", BoardPieceType.Rook, new Mesh())]
      ]));
    let board = await boardBuilder.createBoard();

    let gameOver = sut.isGameOver(board);

    expect(gameOver).to.be.false;
  });

  it('in checkmate so game is over', async () => {
    let sut = new ChessStateProcessor();
    let boardBuilder = new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece | undefined>([
        [BoardCoordinate.at(1, 1), new BoardPiece("white", BoardPieceType.King, new Mesh())],
        [BoardCoordinate.at(1, 7), new BoardPiece("black", BoardPieceType.Rook, new Mesh())],
        [BoardCoordinate.at(2, 7), new BoardPiece("black", BoardPieceType.Rook, new Mesh())]
      ]));
    let board = await boardBuilder.createBoard();

    let gameOver = sut.isGameOver(board);

    expect(gameOver).to.be.true;
  });
});
