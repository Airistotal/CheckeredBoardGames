import QueenMovementJudge from '../../../../src/business/chess/movementJudges/QueenMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import MovementData from '../../../../src/models/MovementData';
import TestBoardPieceGeometryBuilder from '../../../mocks/TestBoardPieceGeometryBuilder';

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
      let queen = new BoardPiece("black", BoardPieceType.Queen, pieceGeometry);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), destination, board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), destination, board, new Array<string>(queen.id));
      board.get(mvDta.origin).setPiece(queen);

      expect(queenMovementJudge.isLegalMove(mvDta)).to.be.true;
      expect(queenMovementJudge.isLegalMove(mvDtaMoved)).to.be.true;
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
      let queen = new BoardPiece("black", BoardPieceType.Queen, pieceGeometry);
      let mvDta = new MovementData(BoardCoordinate.at(4, 4), destination, board);
      let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), destination, board, new Array<string>(queen.id));
      board.get(mvDta.origin).setPiece(queen);

      expect(queenMovementJudge.isLegalMove(mvDta)).to.be.false;
      expect(queenMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
    })
  });

  it(`queen cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let queen = new BoardPiece("black", BoardPieceType.Queen, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(1, 1), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(1, 1), board, new Array<string>(queen.id));
    board.get(mvDta.origin).setPiece(queen);
    board.get(BoardCoordinate.at(2, 2)).setPiece(new BoardPiece("white", BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.isLegalMove(mvDta)).to.be.false;
    expect(queenMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
  });

  it(`queen cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let queen = new BoardPiece("black", BoardPieceType.Queen, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(1, 1), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(1, 1), board, new Array<string>(queen.id));
    board.get(mvDta.origin).setPiece(queen);
    board.get(mvDta.destination).setPiece(new BoardPiece("black", BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.isLegalMove(mvDta)).to.be.false;
    expect(queenMovementJudge.isLegalMove(mvDtaMoved)).to.be.false;
  });

  it(`queen can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let queen = new BoardPiece("black", BoardPieceType.Queen, pieceGeometry);
    let mvDta = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(1, 1), board);
    let mvDtaMoved = new MovementData(BoardCoordinate.at(4, 4), BoardCoordinate.at(1, 1), board, new Array<string>(queen.id));
    board.get(mvDta.origin).setPiece(queen);
    board.get(mvDta.destination).setPiece(new BoardPiece("white", BoardPieceType.Bishop, pieceGeometry));

    expect(queenMovementJudge.isLegalMove(mvDta)).to.be.true;
    expect(queenMovementJudge.isLegalMove(mvDtaMoved)).to.be.true;
  });
});
