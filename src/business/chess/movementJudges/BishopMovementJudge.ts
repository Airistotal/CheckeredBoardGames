import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class BishopMovementJudge implements MovementJudge {
	private static BishopMove = new Vector2(1, 1);

  public isLegalMove(movementData: MovementData): boolean {
  	let originPiece = movementData.board.get(movementData.origin);
  	if (originPiece === undefined) return false;

  	let moveVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
  	let destinationPiece = movementData.board.get(movementData.destination);

    return BishopMovementJudge.BishopMove.equals(this.getAbsoluteVectorForBishop(moveVector)) &&
    			 this.missOtherPieces(movementData.origin, movementData.destination, movementData.board) &&
    			 (destinationPiece === undefined || originPiece.team !== destinationPiece.team);
  }

  private missOtherPieces(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    let moveVector = BoardCoordinate.getVector(origin, destination).clampScalar(-1, 1);
    let originVector = BoardCoordinate.getVector(BoardCoordinate.at(0, 0), origin);
    let destinationVector = BoardCoordinate.getVector(BoardCoordinate.at(0, 0), destination);

    originVector = originVector.add(moveVector);
    while (!originVector.equals(destinationVector)) {
      let targetPiece = board.get(BoardCoordinate.at(originVector.x, originVector.y));
      if (targetPiece !== undefined) {
        return false;
      }

      originVector = originVector.add(moveVector);
    }

    return true;
  }

  private getAbsoluteVectorForBishop(moveVector: Vector2) {
  	return new Vector2(Math.abs(moveVector.x / moveVector.x), Math.abs(moveVector.y / moveVector.x));
  }
}