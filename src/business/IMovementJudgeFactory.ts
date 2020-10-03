import GameType from '../models/enums/GameType';
import MovementJudge from './MovementJudge';

interface IMovementJudgeFactory {
  createMovementJudge(type: GameType): MovementJudge;
}

export default IMovementJudgeFactory;