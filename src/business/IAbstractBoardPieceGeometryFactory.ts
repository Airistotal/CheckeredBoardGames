import GameType from '../models/enums/GameType';
import BoardPieceGeometryFactory  from './BoardPieceGeometryFactory';

interface IAbstractBoardPieceGeometryFactory {
  createBoardPieceGeometryFactory(type: GameType): BoardPieceGeometryFactory;
}

export default IAbstractBoardPieceGeometryFactory;