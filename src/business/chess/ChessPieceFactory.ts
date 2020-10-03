import BoardPieceFactory from '../BoardPieceFactory';
import BoardPiece from '../../models/BoardPiece';
import BoardPieceType from '../../models/enums/BoardPieceType';
import BoardPieceGeometryFactory from '../BoardPieceGeometryFactory';

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
    @inject(IOCTypes.BoardPieceGeometryFactory) boardPieceGeometryFactory: BoardPieceGeometryFactory) {
    this.boardPieceGeometryFactory = boardPieceGeometryFactory;
  }

  createBoardPiece(name: string, type: BoardPieceType): BoardPiece {
    if (ChessPieceFactory.knownPieces.some((v) => v === type)) {
      let pieceMesh = this.boardPieceGeometryFactory.createGeometryFor(type);
      return new BoardPiece(name, type, pieceMesh);
    } else {
      throw new Error(`I don't know how to make ${BoardPieceType[type]}`);
    }
  }
}

export default ChessPieceFactory;