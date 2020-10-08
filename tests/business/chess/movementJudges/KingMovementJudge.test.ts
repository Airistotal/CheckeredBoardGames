import KingMovementJudge from '../../../../src/business/chess/movementJudges/KingMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import MovementData from '../../../../src/models/MovementData';
import TestBoardPieceGeometryFactory from '../../../mocks/TestBoardPieceGeometryFactory';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('KingMovementJudge tests', () => {
  let testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
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
      let king = new BoardPiece("white", BoardPieceType.King, pieceGeometry);
      let board = new Board(8, 8);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), destination, board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), destination, board, new Array<string>(king.id));
      mvDta.board.get(mvDta.origin).setPiece(king);

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
      let king = new BoardPiece("white", BoardPieceType.King, pieceGeometry);
      let board = new Board(8, 8);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), destination, board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), destination, board, new Array<string>(king.id));

      expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
      expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
    })
  });

  it(`king can queenside castle`, () => {
    let mvDta = new MovementData(BoardCoordinate.at(5, 1), BoardCoordinate.at(3, 1), new Board(8, 8));
    let rookOrigin = KingMovementJudge.getCasltingRookOrigin(mvDta);
    mvDta.board.get(mvDta.origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));
    mvDta.board.get(rookOrigin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry))

    debugger;

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
  });

  it(`king can kingside castle`, () => {
    let mvDta = new MovementData(BoardCoordinate.at(5, 1), BoardCoordinate.at(7, 1), new Board(8, 8));
    let rookOrigin = KingMovementJudge.getCasltingRookOrigin(mvDta);
    mvDta.board.get(mvDta.origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));
    mvDta.board.get(rookOrigin).setPiece(new BoardPiece("white", BoardPieceType.Rook, pieceGeometry))

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
  });

  it(`king cannot castle with pieces in the way`, () => {
    let mvDta = new MovementData(BoardCoordinate.at(5, 1), BoardCoordinate.at(7, 1), new Board(8, 8));
    mvDta.board.get(mvDta.origin).setPiece(new BoardPiece("white", BoardPieceType.King, pieceGeometry));
    mvDta.board.get(mvDta.destination).setPiece(new BoardPiece("black", BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
  });

  it(`king cannot castle after first move`, () => {
    let king = new BoardPiece("white", BoardPieceType.King, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(5, 1), BoardCoordinate.at(7, 1), new Board(8, 8), new Array<string>(king.id));
    mvDta.board.get(mvDta.origin).setPiece(king);

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
  });

  it(`king cannot capture piece on same team`, () => {
    let king = new BoardPiece("white", BoardPieceType.King, pieceGeometry);
    let board = new Board(8, 8);
    let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(4, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(4, 3), board, new Array<string>(king.id));
    board.get(mvDta.origin).setPiece(king);
    board.get(mvDta.destination).setPiece(new BoardPiece("white", BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.false;
    expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
  });

  it(`king can capture piece on different team`, () => {
    let king = new BoardPiece("white", BoardPieceType.King, pieceGeometry);
    let board = new Board(8, 8);
    let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(4, 3), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(4, 3), board, new Array<string>(king.id));
    board.get(mvDta.origin).setPiece(king);
    board.get(mvDta.destination).setPiece(new BoardPiece("black", BoardPieceType.Bishop, pieceGeometry));

    expect(kingMovementJudge.isLegalMove(mvDta)).to.be.true;
    expect(kingMovementJudge.isLegalMove(mvDtaMoved)).to.be.true;
  });
});
