import IAbstractPieceMovementJudgeFactory from './IAbstractPieceMovementJudgeFactory';
import PieceMovementJudgeFactory from './PieceMovementJudgeFactory';
import ChessPieceMovementJudgeFactory from './chess/ChessPieceMovementJudgeFactory';
import GameType from '../models/enums/GameType';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class AbstractPieceMovementJudgeFactory implements IAbstractPieceMovementJudgeFactory {
  createPieceMovementJudgeFactory(type: GameType): PieceMovementJudgeFactory {
    switch(type) {
      case GameType.Chess:
        return new ChessPieceMovementJudgeFactory();
        break;
      case GameType.Checkers:
        throw new Error("Checkers not implemented yet");
        break;
      default:
        throw new Error("I don't know which PieceMovementJudgeFactory to make!");
        break;
    }
  }
}

export default AbstractPieceMovementJudgeFactory;
