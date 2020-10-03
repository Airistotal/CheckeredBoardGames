import IGameMediatorFactory from './IGameMediatorFactory';
import IBoardBuilderFactory from './IBoardBuilderFactory';
import IMovementJudgeFactory from './IMovementJudgeFactory';
import GameMediator from './GameMediator';
import ChessMediator from './chess/ChessMediator';
import GameType from '../models/enums/GameType';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class GameMediatorFactory implements IGameMediatorFactory {
  private boardBuilderFactory: IBoardBuilderFactory;
  private movementJudgeFactory: IMovementJudgeFactory;

  constructor(
    @inject(IOCTypes.BoardBuilderFactory) boardBuilderFactory: IBoardBuilderFactory,
    @inject(IOCTypes.MovementJudgeFactory) movementJudgeFactory: IMovementJudgeFactory) {
    this.boardBuilderFactory = boardBuilderFactory;
    this.movementJudgeFactory = movementJudgeFactory;
  }

  public createGameMediator(type: GameType): GameMediator {
    switch(type) {
      case GameType.Chess:
        let boardBuilder = this.boardBuilderFactory.createBoardBuilder(type);
        let movementJudge = this.movementJudgeFactory.createMovementJudge(type);
        
        return new ChessMediator(boardBuilder, movementJudge);
        break;
      case GameType.Checkers:
        throw Error("Checkers not implemented yet");
        break;
      default:
        throw Error("I don't know which game to make!");
        break;
    }
  }
}

export default GameMediatorFactory;
