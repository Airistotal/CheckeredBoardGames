import BoardPieceBuilder from '../BoardPieceBuilder';
import BoardPiece from '../../models/BoardPiece';
import BoardPieceType from '../../models/enums/BoardPieceType';
import BoardPieceGeometryBuilder from '../BoardPieceGeometryBuilder';
import GameType from '../../models/enums/GameType';
import Team from '../../models/enums/Team';

import { Mesh } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessPieceBuilder implements BoardPieceBuilder {
  private BoardPieceGeometryBuilder: BoardPieceGeometryBuilder;
  private static knownPieces = [
    BoardPieceType.Pawn,
    BoardPieceType.Knight,
    BoardPieceType.Bishop,
    BoardPieceType.Rook,
    BoardPieceType.Queen,
    BoardPieceType.King];

  constructor(
    @inject(IOCTypes.BoardPieceGeometryBuilderFactory) abstractBoardPieceGeometryBuilder: (type: GameType) => BoardPieceGeometryBuilder) {
    this.BoardPieceGeometryBuilder = abstractBoardPieceGeometryBuilder(GameType.Chess);
  }

  createBoardPiece(team: Team, type: BoardPieceType): Promise<BoardPiece> {
    return new Promise((resolve, reject) => {
      if (ChessPieceBuilder.knownPieces.some((v) => v === type)) {
        this.BoardPieceGeometryBuilder.createGeometryFor(type).then((g) => {
          resolve(new BoardPiece(team, type, g));
        });
      } else {
        reject(`I don't know how to make ${BoardPieceType[type]}`);
      }
    });
  }
}

export default ChessPieceBuilder;