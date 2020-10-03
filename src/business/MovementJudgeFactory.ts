import IMovementJudgeFactory from './IMovementJudgeFactory';
import MovementJudge from './MovementJudge';
import ChessMovementJudge from './chess/movementJudges/ChessMovementJudge';
import GameType from '../models/enums/GameType';
import IAbstractPieceMovementJudgeFactory from './IAbstractPieceMovementJudgeFactory';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class MovementJudgeFactory implements IMovementJudgeFactory {
  private abstractPieceMovementJudgeFactory: IAbstractPieceMovementJudgeFactory;

  constructor(
    @inject(IOCTypes.AbstractPieceMovementJudgeFactory) abstractPieceMovementJudgeFactory: IAbstractPieceMovementJudgeFactory) {
    this.abstractPieceMovementJudgeFactory = abstractPieceMovementJudgeFactory;
  }

  createMovementJudge(type: GameType): MovementJudge {
    switch(type) {
      case GameType.Chess:
        let pieceMovementJudgeFactory = this.abstractPieceMovementJudgeFactory.createPieceMovementJudgeFactory(type);

        return new ChessMovementJudge(pieceMovementJudgeFactory);
        break;
      case GameType.Checkers:
        throw new Error("Checkers not implemented yet.");
        break;
      default:
        throw new Error("I don't know which movement judge to make!");
        break;
    }
  }
}

export default MovementJudgeFactory;