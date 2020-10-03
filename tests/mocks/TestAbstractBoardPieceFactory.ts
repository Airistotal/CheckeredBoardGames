import IAbstractBoardPieceFactory from '../../src/business/IAbstractBoardPieceFactory';
import GameType from '../../src/models/enums/GameType';
import BoardPieceFactory from '../../src/business/BoardPieceFactory';
import TestBoardPieceFactory from '../mocks/TestBoardPieceFactory';

class TestAbstractBoardPieceFactory implements IAbstractBoardPieceFactory {
  createBoardPieceFactory(type: GameType): BoardPieceFactory {
    return new TestBoardPieceFactory();
  }
}

export default TestAbstractBoardPieceFactory;