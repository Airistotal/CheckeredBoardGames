import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardTile } from '../../../models/BoardTile';
import { BoardPiece } from '../../../models/BoardPiece';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class KnightMovementJudge implements MovementJudge {
  public isLegalMove(movementData: MovementData): boolean {
    return this.getPossibleMoves(movementData).includes(movementData.destination);
  }

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();

    this.getRawMoveList(movementData.origin).forEach((coord) => {
      if (this.isValidDestination(coord, movementData)) {
        possibleMoves.push(coord);
      }
    });

    return possibleMoves;
  }

  private isValidDestination(dest: BoardCoordinate, movementData: MovementData): boolean {
    if (dest.col < 1 || dest.col > 8 || dest.row < 1 || dest.row > 8) {
      return false;
    }

    let originPiece = movementData.board.get(movementData.origin);
    let destPiece = movementData.board.get(dest);

    return originPiece !== undefined &&
           originPiece.type === BoardPieceType.Knight &&
           (destPiece === undefined || destPiece.team !== originPiece.team);
  }

  private getRawMoveList(origin: BoardCoordinate): Array<BoardCoordinate> {
    let unfilteredPossibleMoves = new Array<BoardCoordinate>();

    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 1, origin.row + 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 1, origin.row + 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 1, origin.row - 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 1, origin.row - 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 2, origin.row + 1));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 2, origin.row + 1));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 2, origin.row - 1));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 2, origin.row - 1));

    return unfilteredPossibleMoves;
  }
}