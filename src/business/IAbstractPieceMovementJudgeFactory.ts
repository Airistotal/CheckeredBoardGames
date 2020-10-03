import GameType from '../models/enums/GameType';
import PieceMovementJudgeFactory from './PieceMovementJudgeFactory';

interface IAbstractPieceMovementJudgeFactory {
  createPieceMovementJudgeFactory(type: GameType): PieceMovementJudgeFactory;
}

export default IAbstractPieceMovementJudgeFactory;
