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
    let originPiece = movementData.board.get(movementData.origin);

    return originPiece !== undefined && 
           originPiece.type === BoardPieceType.Knight &&
           this.getPossibleMoves(movementData).includes(movementData.destination);
  }

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    let origin = movementData.origin;

    let unfilteredPossibleMoves = new Array<BoardCoordinate>();
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 1, origin.row + 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 1, origin.row + 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 1, origin.row - 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 1, origin.row - 2));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 2, origin.row + 1));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 2, origin.row + 1));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col + 2, origin.row - 1));
    unfilteredPossibleMoves.push(BoardCoordinate.at(origin.col - 2, origin.row - 1));

    unfilteredPossibleMoves.forEach((coord) => {
      if (coord.col > 0 && coord.col < 9 &&
          coord.row > 0 && coord.row < 9) {
        possibleMoves.push(coord);
      }
    });

    return possibleMoves;
  }
}