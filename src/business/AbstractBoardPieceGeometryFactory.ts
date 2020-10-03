import GameType from '../models/enums/GameType';
import BoardPieceGeometryFactory  from './BoardPieceGeometryFactory';
import IAbstractBoardPieceGeometryFactory from './IAbstractBoardPieceGeometryFactory';
import ChessPieceGeometryFactory from './chess/ChessPieceGeometryFactory';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class AbstractBoardPieceGeometryFactory implements IAbstractBoardPieceGeometryFactory {
  createBoardPieceGeometryFactory(type: GameType): BoardPieceGeometryFactory {
    switch (type) {
      case GameType.Chess:
        return new ChessPieceGeometryFactory();
        break;
      
      case GameType.Checkers:
        throw new Error("Checkers not implemented yet.");
        break;

      default:
        throw new Error("I don't know which BoardPieceGeometryFactory to make!");
        break;
    }
  }
}

export default AbstractBoardPieceGeometryFactory;