import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class KingMovementJudge implements MovementJudge {
  public static isCaslting(movementData: MovementData): boolean {
    return KingMovementJudge.getCastlingMoves(movementData).includes(movementData.destination);
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
    return this.getPossibleMoves(movementData).includes(movementData.destination);
  }

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    
    possibleMoves.concat(this.getAllMovesAroundKing(movementData));
    possibleMoves.concat(KingMovementJudge.getCastlingMoves(movementData));

    return possibleMoves;
  }

  private getAllMovesAroundKing(movementData: MovementData) {
    let possibleMoves = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined || originPiece.type !== BoardPieceType.King) return possibleMoves;

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i < 1 || i > 8 || j < 1 || j > 8) continue;
        if (i === 0 && j === 0) continue;

        let moveVector = new Vector2(i, j);
        let destination = movementData.origin.addVector(moveVector);

        let destinationPiece = movementData.board.get(destination);
        if (destinationPiece !== undefined) {
          if (destinationPiece.team !== originPiece.team) {
            possibleMoves.push(destination);
          }
        } else {
          possibleMoves.push(destination);
        }
      }
    }

    return possibleMoves;
  }

  private static getCastlingMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin)
    if (originPiece === undefined || 
        originPiece.type !== BoardPieceType.King ||
        movementData.movedPieces.includes(originPiece.id))
    {
      return possibleMoves;
    }

    if (this.arePiecesInPlaceForKingsideCastle(movementData)) {
      possibleMoves.push(movementData.origin.addVector(new Vector2(2,  0)));
    }

    if (this.arePiecesInPlaceForQueensideCastle(movementData)) {
      possibleMoves.push(movementData.origin.addVector(new Vector2(-2,  0)));
    }

    return possibleMoves;
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
}