import BoardBuilder from '../../src/business/BoardBuilder';
import Board from '../../src/models/Board';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import TestBoardPieceGeometryFactory from '../mocks/TestBoardPieceGeometryFactory';
import { Mesh } from 'three';

class TestBoardBuilder implements BoardBuilder {
  private piecesAt: Array<BoardCoordinate>;
  private testBoardPieceGeometryFactory: TestBoardPieceGeometryFactory;

  constructor(piecesAt: Array<BoardCoordinate>) {
    this.piecesAt = piecesAt;
    this.testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
  }

  public createBoard(): Promise<Board> {
    return new Promise<Board>((resolve, reject) => {
      let board = new Board(8, 8);

      this.piecesAt.forEach((coord) => {
        board.get(coord).setPiece(new BoardPiece("white", BoardPieceType.Pawn, new Mesh()));
      })

      resolve(board);
    });
  }
}

export default TestBoardBuilder;
