import BoardBuilder from '../../src/business/BoardBuilder';
import Board from '../../src/models/Board';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import Team from '../../src/models/enums/Team';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import TestBoardPieceGeometryBuilder from '../mocks/TestBoardPieceGeometryBuilder';
import { Mesh } from 'three';

class TestBoardBuilder implements BoardBuilder {
  private piecesAt: Map<BoardCoordinate, BoardPiece | undefined>;
  private testBoardPieceGeometryBuilder: TestBoardPieceGeometryBuilder;

  constructor(piecesAt: Map<BoardCoordinate, BoardPiece | undefined>) {
    this.piecesAt = piecesAt;
    this.testBoardPieceGeometryBuilder = new TestBoardPieceGeometryBuilder();
  }

  public createBoard(): Promise<Board> {
    return new Promise<Board>((resolve, reject) => {
      let board = new Board(8, 8);

      this.piecesAt.forEach((piece, coord) => {
        board.get(coord).setPiece(
          piece === undefined ?
          new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()) :
          piece);
      })

      resolve(board);
    });
  }
}

export default TestBoardBuilder;
