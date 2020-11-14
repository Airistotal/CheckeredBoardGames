import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Vector2 } from 'three';

export class KingMovementJudge implements MovementJudge {
  private static KingMoves = [new Vector2(0, 1), new Vector2(1, 0), new Vector2(1, 1)];
  private static Castling = new Vector2(2,  0);

  public static isCaslting(movementData: MovementData): boolean {
    let originPiece = movementData.board.get(movementData.origin)
    if (originPiece === undefined ||
        originPiece.type !== BoardPieceType.King ||
        movementData.movedPieces.some((v) => originPiece !== undefined && v === originPiece.id)) return false;

    return this.isLegalCastle(movementData);
  }

  public static getCasltingRookOrigin(movementData: MovementData): BoardCoordinate {
    let origin = movementData.origin;
    let moveVector = BoardCoordinate.getVector(origin, movementData.destination);

    return moveVector.x < 0 ?
           BoardCoordinate.at(origin.col - 4, origin.row) :
           BoardCoordinate.at(origin.col + 3, origin.row)
  }

  public static getCasltingRookDestination(movementData: MovementData): BoardCoordinate {
    let origin = movementData.origin;
    let moveVector = BoardCoordinate.getVector(origin, movementData.destination);

    return moveVector.x < 0 ?
           BoardCoordinate.at(origin.col - 1, origin.row) :
           BoardCoordinate.at(origin.col + 1, origin.row)
  }

  public isLegalMove(movementData: MovementData): boolean {
    let originPiece = movementData.board.get(movementData.origin)
    if (originPiece === undefined) return false;

    let moveVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    let destinationPiece = movementData.board.get(movementData.destination);

    let isLegalCastle = false;
    if (!movementData.movedPieces.some((v) => originPiece !== undefined && v === originPiece.id)) {
      isLegalCastle = KingMovementJudge.isLegalCastle(movementData);
    }

    return (KingMovementJudge.KingMoves.some((v) => v.equals(KingMovementJudge.getAbsoluteVectorForKing(moveVector))) &&
           (destinationPiece === undefined || destinationPiece.team !== originPiece.team)) ||
           isLegalCastle;
  }

  private static isLegalCastle(movementData: MovementData): boolean {
    let moveVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);

    return KingMovementJudge.Castling.equals(KingMovementJudge.getAbsoluteVectorForKing(moveVector)) &&
           (moveVector.x < 0 ?
           this.arePiecesInPlaceForQueensideCastle(movementData) :
           this.arePiecesInPlaceForKingsideCastle(movementData));
  }

  private static arePiecesInPlaceForQueensideCastle(movementData: MovementData): boolean {
    let board = movementData.board;
    let origin = movementData.origin;
    let rook = board.get(BoardCoordinate.at(origin.col - 4, origin.row));

    return board.get(BoardCoordinate.at(origin.col - 1, origin.row)) === undefined &&
           board.get(BoardCoordinate.at(origin.col - 2, origin.row)) === undefined &&
           board.get(BoardCoordinate.at(origin.col - 3, origin.row)) === undefined &&
           rook !== undefined && rook.type === BoardPieceType.Rook &&
           !movementData.movedPieces.some((v) => rook !== undefined && v === rook.id);
  }

  private static arePiecesInPlaceForKingsideCastle(movementData: MovementData): boolean {
    let board = movementData.board;
    let origin = movementData.origin;
    let rook = board.get(BoardCoordinate.at(origin.col + 3, origin.row));

    return board.get(BoardCoordinate.at(origin.col + 1, origin.row)) === undefined &&
           board.get(BoardCoordinate.at(origin.col + 2, origin.row)) === undefined &&
           rook !== undefined && rook.type === BoardPieceType.Rook &&
           !movementData.movedPieces.some((v) => rook !== undefined && v === rook.id);
  }

  private static getAbsoluteVectorForKing(v: Vector2): Vector2 {
    return new Vector2(Math.abs(v.x), Math.abs(v.y));
  }
}