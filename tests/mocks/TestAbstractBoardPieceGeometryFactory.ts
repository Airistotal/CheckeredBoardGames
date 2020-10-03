import IAbstractBoardPieceGeometryFactory from '../../src/business/IAbstractBoardPieceGeometryFactory';
import GameType from '../../src/models/enums/GameType';
import BoardPieceGeometryFactory from '../../src/business/BoardPieceGeometryFactory';
import TestBoardPieceGeometryFactory from '../mocks/TestBoardPieceGeometryFactory';

class TestAbstractBoardPieceGeometryFactory implements IAbstractBoardPieceGeometryFactory {
  createBoardPieceGeometryFactory(type: GameType): BoardPieceGeometryFactory {
    return new TestBoardPieceGeometryFactory();
  }
}

export default TestAbstractBoardPieceGeometryFactory;