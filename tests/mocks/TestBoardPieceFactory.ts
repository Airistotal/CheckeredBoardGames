import BoardPieceFactory from '../../src/business/BoardPieceFactory';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPieceGeometryFactory from '../../src/business/BoardPieceGeometryFactory';
import TestBoardPieceGeometryFactory from '../mocks/testBoardPieceGeometryFactory';

class TestBoardPieceFactory implements BoardPieceFactory {
  private testBoardPieceGeometryFactory: BoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();

  createBoardPiece(team: string, type: BoardPieceType): BoardPiece {
    let geometry = this.testBoardPieceGeometryFactory.createGeometryFor(type);

    return new BoardPiece(team, type, geometry);
  }
}

export default TestBoardPieceFactory;