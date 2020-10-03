import IAbstractBoardPieceFactory from './IAbstractBoardPieceFactory'
import IAbstractBoardPieceGeometryFactory from './IAbstractBoardPieceGeometryFactory'
import GameType from '../models/enums/GameType';
import BoardPieceFactory from './BoardPieceFactory';
import ChessPieceFactory from './chess/ChessPieceFactory';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class AbstractBoardPieceFactory implements IAbstractBoardPieceFactory {
  private abstractBoardPieceGeometryFactory: IAbstractBoardPieceGeometryFactory;

  constructor(
    @inject(IOCTypes.AbstractBoardPieceGeometryFactory) abstractBoardPieceGeometryFactory: IAbstractBoardPieceGeometryFactory) {
    this.abstractBoardPieceGeometryFactory = abstractBoardPieceGeometryFactory;
  }

  createBoardPieceFactory(type: GameType): BoardPieceFactory {
    switch (type) {
      case GameType.Chess:
        let boardPieceGeometryFactory = this.abstractBoardPieceGeometryFactory.createBoardPieceGeometryFactory(type);
        return new ChessPieceFactory(boardPieceGeometryFactory);
        break;

      case GameType.Checkers:
        throw new Error("Checkers not implemented yet.");
        break;
      
      default:
        throw new Error("I don't know which BoardPieceFactory to make!");
        break;
    }
  }
}

export default AbstractBoardPieceFactory;