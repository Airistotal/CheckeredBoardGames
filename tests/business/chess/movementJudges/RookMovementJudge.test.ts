import { RookMovementJudge } from '../../../../src/business/chess/movementJudges/RookMovementJudge';
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

describe('RookMovementJudge tests', () => {
  let testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
  let pieceGeometry = new Mesh();

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
      let rook = new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry);
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
        .withMovedPieces(new Array<string>(rook.id));
      board.set(mvDta.origin, rook);

      expect(new RookMovementJudge().isLegalMove(mvDta)).to.be.true;
      expect(new RookMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
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
      let rook = new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry);
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
        .withMovedPieces(new Array<string>(rook.id));
      board.set(mvDta.origin, rook);

      expect(new RookMovementJudge().isLegalMove(mvDta)).to.be.false;
      expect(new RookMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
    })
  });

  it(`rook cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let rook = new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 1));
    let mvDtaMoved = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 1))
      .withMovedPieces(new Array<string>(rook.id));
    board.set(mvDta.origin, rook);
    board.set(BoardCoordinate.at(4, 3), new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry));

    expect(new RookMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new RookMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it(`rook cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let rook = new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 1));
    let mvDtaMoved = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 1))
      .withMovedPieces(new Array<string>(rook.id));
    board.set(mvDta.origin, rook);
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry));

    expect(new RookMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new RookMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it(`rook can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let rook = new BoardPiece(Team.Black, BoardPieceType.Rook, pieceGeometry);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 1));
    let mvDtaMoved = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(4, 4))
      .to(BoardCoordinate.at(4, 1))
      .withMovedPieces(new Array<string>(rook.id));
    board.set(mvDta.origin, rook);
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Rook, pieceGeometry));

    expect(new RookMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new RookMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  });
});
