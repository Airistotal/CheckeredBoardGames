import PawnMovementJudge from '../../../../src/business/chess/movementJudges/PawnMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import MovementData from '../../../../src/models/MovementData';
import TestBoardPieceGeometryFactory from '../../../mocks/TestBoardPieceGeometryFactory';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('PawnMovementJudge tests', () => {
  let testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
  let pieceGeometry = new Mesh();

  it('pawn can move forward one', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  });

  it('pawn cannot move forward one if blocked', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);
    board.get(mvDta.destination).setPiece(new BoardPiece("black", BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn can move forward two on first move', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 4), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn cannot move forward two if blocked', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 4), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 4), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);
    board.get(BoardCoordinate.at(1, 3)).setPiece(new BoardPiece("black", BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn can capture diagonally', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 3), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);
    board.get(mvDta.destination).setPiece(new BoardPiece("black", BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.true;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.true;
  });

  it('pawn cannot capture same team diagonally', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 3), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);
    board.get(mvDta.destination).setPiece(new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry));

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('pawn cannot move diagonally', () => {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(2, 3), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('white pawn does not move down', function() {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 1), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 1), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });

  it('black pawn does not move up', function() {
    let board = new Board(8, 8);
    let pawn = new BoardPiece("black", BoardPieceType.Pawn, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3), board, new Array<string>(pawn.id));
    board.get(mvDta.origin).setPiece(pawn);

    expect(new PawnMovementJudge().isLegalMove(mvDta)).to.be.false;
    expect(new PawnMovementJudge().isLegalMove(mvDtaMoved)).to.be.false;
  });
});
