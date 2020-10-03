import BoardBuilder from '../../src/business/BoardBuilder';
import Board from '../../src/models/Board';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import TestBoardPieceGeometryFactory from '../mocks/TestBoardPieceGeometryFactory';

class TestBoardBuilder implements BoardBuilder {
  private piecesAt: Array<BoardCoordinate>;
  private testBoardPieceGeometryFactory: TestBoardPieceGeometryFactory;

  constructor(piecesAt: Array<BoardCoordinate>) {
    this.piecesAt = piecesAt;
    this.testBoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();
  }

  public createBoard() {
    let board = new Board(8, 8);

    this.piecesAt.forEach((coord) => {
      let pieceGeometry = this.testBoardPieceGeometryFactory.createGeometryFor(BoardPieceType.Pawn);
      board.get(coord).setPiece(new BoardPiece("white", BoardPieceType.Pawn, pieceGeometry));
    })

    return board;
  }
}

export default TestBoardBuilder;
