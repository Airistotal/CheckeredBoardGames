import BoardBuilder from './BoardBuilder';
import ChessBoardBuilder from './chess/ChessBoardBuilder';
import IBoardBuilderFactory from './BoardBuilderFactory';
import GameType from '../models/enums/GameType';
import Bootstrapper from './initialization/Bootstrapper';
import IAbstractBoardPieceFactory  from './IAbstractBoardPieceFactory';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class BoardBuilderFactory implements IBoardBuilderFactory {
  private readonly abstractBoardPieceFactory: IAbstractBoardPieceFactory;

  constructor(@inject(IOCTypes.AbstractBoardPieceFactory) abstractBoardPieceFactory: IAbstractBoardPieceFactory) {
    this.abstractBoardPieceFactory = abstractBoardPieceFactory;
  }

  public createBoardBuilder(type: GameType): BoardBuilder {
    switch(type) {
      case GameType.Chess:
        let boardPieceFactory = this.abstractBoardPieceFactory.createBoardPieceFactory(type);
        return new ChessBoardBuilder(boardPieceFactory);
        break;
      case GameType.Checkers:
        throw Error("Checkers not implemented yet");
        break;
      default:
        throw Error("I don't know which board builder to make!");
        break;
    }
  }
}

export default BoardBuilderFactory;