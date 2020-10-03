import GameType from '../models/enums/GameType';
import GameMediator from './GameMediator';

interface IGameMediatorFactory {
  createGameMediator(type: GameType): GameMediator;
}

export default IGameMediatorFactory;