import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardTile } from '../../../models/BoardTile';
import { BoardPiece } from '../../../models/BoardPiece';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class KnightMovementJudge implements MovementJudge {
	private static KnightMoves = [new Vector2(2, 1), new Vector2(1, 2)];

  public isLegalMove(movementData: MovementData): boolean {
  	let originPiece = movementData.board.get(movementData.origin);
  	if (originPiece === undefined) return false;

  	let moveVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
  	let destinationPiece = movementData.board.get(movementData.destination);

    return KnightMovementJudge.KnightMoves.some((v) => v.equals(this.normalizeVectorForKnight(moveVector))) &&
  				 (destinationPiece === undefined || destinationPiece.team !== originPiece.team);
  }

  private normalizeVectorForKnight(moveVector: Vector2): Vector2 {
  	return new Vector2(Math.abs(moveVector.x), Math.abs(moveVector.y))
  }
}