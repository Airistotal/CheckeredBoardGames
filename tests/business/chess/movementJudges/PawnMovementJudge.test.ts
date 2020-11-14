import { PawnMovementJudge } from '../../../../src/business/chess/movementJudges/PawnMovementJudge';
import { BoardCoordinate } from '../../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../../src/models/BoardPiece';
import { BoardPieceType } from '../../../../src/models/enums/BoardPieceType';
import { Board } from '../../../../src/models/Board';
import { MovementData } from '../../../../src/models/MovementData';
import { FluentMovementDataBuilder } from '../../../../src/business/FluentMovementDataBuilder';
import { TestBoardPieceGeometryBuilder } from '../../../mocks/TestBoardPieceGeometryBuilder';
import { Team } from '../../../../src/models/enums/Team';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('PawnMovementJudge tests', () => {
  let testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
  let pieceGeometry = new Mesh();

  it('pawn can move forward one', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(1, 3));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(1, 3))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  });

  it('pawn cannot move forward one if blocked', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);

    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(1, 3));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(1, 3))
                                              .withMovedPieces(new Array<string>(pawn.id));

    board.set(mvDta.origin, pawn);
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn can move forward two on first move', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(1, 4));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(1, 4))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn cannot move forward two if blocked', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);

    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(1, 4));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(1, 4))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);
    board.set(BoardCoordinate.at(1, 3), new BoardPiece(Team.Black, BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn can capture diagonally', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(2, 3));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(2, 3))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  });

  it('pawn cannot capture same team diagonally', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(2, 3));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(2, 3))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn cannot move diagonally', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(2, 3));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(2, 3))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('white pawn does not move down', function() {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.White, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(1,1));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(1, 1))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('black pawn does not move up', function() {
    let board = new Board(8, 8);
    let pawn = new BoardPiece(Team.Black, BoardPieceType.Pawn, pieceGeometry);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(1, 2))
                                         .to(BoardCoordinate.at(1,3));
    let mvDtaMoved = FluentMovementDataBuilder.MovementData()
                                              .on(board)
                                              .from(BoardCoordinate.at(1, 2))
                                              .to(BoardCoordinate.at(1, 3))
                                              .withMovedPieces(new Array<string>(pawn.id));
    board.set(mvDta.origin, pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });
});
