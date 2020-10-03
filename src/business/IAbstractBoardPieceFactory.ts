import GameType from '../models/enums/GameType';
import BoardPieceFactory from './BoardPieceFactory';

interface IAbstractBoardPieceFactory {
  createBoardPieceFactory(type: GameType): BoardPieceFactory;
}

export default IAbstractBoardPieceFactory;