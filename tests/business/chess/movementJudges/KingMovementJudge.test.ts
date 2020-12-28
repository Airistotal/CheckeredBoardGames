import { KingMovementJudge } from '../../../../src/business/chess/movementJudges/KingMovementJudge';
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

describe('KingMovementJudge tests', () => {
  let testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
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
      let king = new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry);
      let board = new Board(8, 8);
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(board)
        .from(BoardCoordinate.at(4, 4))
        .to(destination);
      let mvDtaMoved = FluentMovementDataBuilder
        .MovementData()
        .on(board)
        .from(BoardCoordinate.at(4, 4))
        .to(destination)
        .withMovedPieces(new Array<string>(king.id));
      mvDta.board.set(mvDta.origin, king);

      expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
      expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.true;
    });
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
      let king = new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry);
      let board = new Board(8, 8);
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(board)
        .from(BoardCoordinate.at(4, 4))
        .to(destination);
      let mvDtaMoved = FluentMovementDataBuilder
        .MovementData()
        .on(board)
        .from(BoardCoordinate.at(4, 4))
        .to(destination)
        .withMovedPieces(new Array<string>(king.id));

      expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
      expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
    })
  });

  it(`king can queenside castle`, () => {
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(new Board(8, 8))
        .from(BoardCoordinate.at(5, 1))
        .to(BoardCoordinate.at(3, 1));
    let rookOrigin = KingMovementJudge.getCasltingRookOrigin(mvDta);
    mvDta.board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry));
    mvDta.board.set(rookOrigin, new BoardPiece(Team.White, BoardPieceType.Rook, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
  });

  it(`king can kingside castle`, () => {
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(new Board(8, 8))
        .from(BoardCoordinate.at(5, 1))
        .to(BoardCoordinate.at(7, 1));
    let rookOrigin = KingMovementJudge.getCasltingRookOrigin(mvDta);
    mvDta.board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry));
    mvDta.board.set(rookOrigin, new BoardPiece(Team.White, BoardPieceType.Rook, pieceGeometry))

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
  });

  it(`king cannot castle with pieces in the way`, () => {
      let mvDta = FluentMovementDataBuilder
        .MovementData()
        .on(new Board(8, 8))
        .from(BoardCoordinate.at(5, 1))
        .to(BoardCoordinate.at(7, 1));
    mvDta.board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry));
    mvDta.board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
  });

  it(`king cannot castle after first move`, () => {
    let king = new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(new Board(8, 8))
      .from(BoardCoordinate.at(5, 1))
      .to(BoardCoordinate.at(7, 1))
      .withMovedPieces(new Array<string>(king.id));
    mvDta.board.set(mvDta.origin, king);

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
  });

  it(`king cannot capture piece on same team`, () => {
    let king = new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry);
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 3));
    let mvDtaMoved = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 3))
      .withMovedPieces(new Array<string>(king.id));
    board.set(mvDta.origin, king);
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
    expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
  });

  it(`king can capture piece on different team`, () => {
    let king = new BoardPiece(Team.White, BoardPieceType.King, pieceGeometry);
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 4))
      .to(BoardCoordinate.at(4, 3));
    let mvDtaMoved = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 4))
      .to(BoardCoordinate.at(4, 3))
      .withMovedPieces(new Array<string>(king.id));
    board.set(mvDta.origin, king);
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
    expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.true;
  });

  it(`King can move everywhere with attack, get possible moves`, () => {
    let board = new Board(8, 8);
    let king = new BoardPiece(Team.Black, BoardPieceType.King, pieceGeometry)
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .withMovedPieces(new Array<string>(king.id));

    board.set(mvDta.origin, king);
    board.set(BoardCoordinate.at(4, 3), new BoardPiece(Team.White, BoardPieceType.Rook, pieceGeometry));

    expect(kingMovementJudge.getPossibleMoves(mvDta).length).to.be.equal(8);
  });

  it(`King can move everywhere except one, get possible moves`, () => {
    let board = new Board(8, 8);
    let king = new BoardPiece(Team.Black, BoardPieceType.King, pieceGeometry)
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .withMovedPieces(new Array<string>(king.id));

    board.set(mvDta.origin, king);
    board.set(BoardCoordinate.at(4, 3), new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry));

    expect(kingMovementJudge.getPossibleMoves(mvDta).length).to.be.equal(7);
  });

  it(`King can move everywhere and castling, get possible moves`, () => {
    let board = new Board(8, 8);
    let king = new BoardPiece(Team.Black, BoardPieceType.King, pieceGeometry)
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 4));

    board.set(mvDta.origin, king);
    board.set(BoardCoordinate.at(8, 4), new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry));
    board.set(BoardCoordinate.at(1, 4), new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry));

    expect(kingMovementJudge.getPossibleMoves(mvDta).length).to.be.equal(10);
  });
});
