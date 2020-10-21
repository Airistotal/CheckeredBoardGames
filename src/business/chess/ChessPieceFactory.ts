import BoardPieceFactory from '../BoardPieceFactory';
import BoardPiece from '../../models/BoardPiece';
import BoardPieceType from '../../models/enums/BoardPieceType';
import BoardPieceGeometryFactory from '../BoardPieceGeometryFactory';
import GameType from '../../models/enums/GameType';

import { Mesh } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessPieceFactory implements BoardPieceFactory {
  private boardPieceGeometryFactory: BoardPieceGeometryFactory;
  private static knownPieces = [
    BoardPieceType.Pawn,
    BoardPieceType.Knight,
    BoardPieceType.Bishop,
    BoardPieceType.Rook,
    BoardPieceType.Queen,
    BoardPieceType.King];

  constructor(
    @inject(IOCTypes.AbstractBoardPieceGeometryFactory) abstractBoardPieceGeometryFactory: (type: GameType) => BoardPieceGeometryFactory) {
    this.boardPieceGeometryFactory = abstractBoardPieceGeometryFactory(GameType.Chess);
  }

  createBoardPiece(team: string, type: BoardPieceType): Promise<BoardPiece> {
    return new Promise((resolve, reject) => {
      if (ChessPieceFactory.knownPieces.some((v) => v === type)) {
        this.boardPieceGeometryFactory.createGeometryFor(type).then((g) => {
          resolve(new BoardPiece(team, type, g));
        });
      } else {
        reject(`I don't know how to make ${BoardPieceType[type]}`);
      }
    });
  }
}

export default ChessPieceFactory;