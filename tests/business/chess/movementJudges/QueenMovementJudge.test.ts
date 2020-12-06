import { QueenMovementJudge } from '../../../../src/business/chess/movementJudges/QueenMovementJudge';
import { BoardCoordinate } from '../../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../../src/models/BoardPiece';
import { BoardPieceType } from '../../../../src/models/enums/BoardPieceType';
import { Board } from '../../../../src/models/Board';
import { MovementData } from '../../../../src/models/MovementData';
import { TestBoardPieceGeometryBuilder } from '../../../mocks/TestBoardPieceGeometryBuilder';
import { Team } from '../../../../src/models/enums/Team';
import { FluentMovementDataBuilder } from '../../../../src/business/FluentMovementDataBuilder';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('QueenMovementJudge tests', () => {
  let testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
  let pieceGeometry = new Mesh();

  let queenMovementJudge = new QueenMovementJudge();

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
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(board)
        .from(BoardCoordinate.at(4, 4))
        .to(destination);
      board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));

      expect(queenMovementJudge.isLegalMove(mvDta)).to.be.true;
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
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(board)
        .from(BoardCoordinate.at(4, 4))
        .to(destination);
      board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));

      expect(queenMovementJudge.isLegalMove(mvDta)).to.be.false;
    })
  });

  it(`queen cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(1, 1));
    board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));
    board.set(BoardCoordinate.at(2, 2), new BoardPiece(Team.White, BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.isLegalMove(mvDta)).to.be.false;
  });

  it(`queen cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.isLegalMove(mvDta)).to.be.false;
  });

  it(`queen can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.isLegalMove(mvDta)).to.be.true;
  });

  it(`queen can move everywhere with attack, returns possible moves`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.getPossibleMoves(mvDta).length).to.be.equal(26);
  });

  it(`queen can move everywhere but one, returns possible moves`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(2, 2));

    board.set(mvDta.origin, new BoardPiece(Team.Black, BoardPieceType.Queen, pieceGeometry));
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.getPossibleMoves(mvDta).length).to.be.equal(25);
  });
});
