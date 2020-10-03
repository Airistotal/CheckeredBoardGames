import GameType from '../models/enums/GameType';
import BoardBuilder from './BoardBuilder';

interface IBoardBuilderFactory {
  createBoardBuilder(type: GameType): BoardBuilder;
}

export default IBoardBuilderFactory;