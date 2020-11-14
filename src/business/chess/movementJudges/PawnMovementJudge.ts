import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardPiece } from '../../../models/BoardPiece';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Team } from '../../../models/enums/Team';
import { BoardTile } from '../../../models/BoardTile';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { Vector2 } from 'three';

export class PawnMovementJudge implements MovementJudge {
  private static PawnMove = new Vector2(0, 1);
  private static PawnInitialMove = new Vector2(0, 2);
  private static PawnAttack = new Vector2(1, 1);

  public static isMoveTwoForward(movementData: MovementData): boolean {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    let originPiece = movementData.board.get(movementData.origin);
    let absVector = PawnMovementJudge.getAbsoluteVectorForPawn(mvVector);

    return originPiece !== undefined &&
           originPiece.type === BoardPieceType.Pawn &&
           PawnMovementJudge.PawnInitialMove.equals(absVector);
  }

  public static isEnPassantAttack(movementData: MovementData, ghostId: string): boolean {
    let originPiece = movementData.board.get(movementData.origin);
    let attackedPiece = movementData.board.get(movementData.destination);

    return attackedPiece !== undefined && attackedPiece.id === ghostId &&
           originPiece !== undefined && originPiece.type === BoardPieceType.Pawn;
  }

  public static getEnPassantCoordinate(movementData: MovementData): BoardCoordinate {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination)
    mvVector.y = 0;

    let enPassantCoordinate = movementData.origin;
    enPassantCoordinate.addVector(mvVector);

    return enPassantCoordinate;
  }

  public static getEnPassantGhostCoordinate(movementData: MovementData): BoardCoordinate {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    mvVector.normalize();

    let enPassantGhostCoord = movementData.origin;
    enPassantGhostCoord.addVector(mvVector);

    return enPassantGhostCoord;
  }

  public isLegalMove(movementData: MovementData) : boolean {
    let board = movementData.board;
    let origin = movementData.origin;
    let dest = movementData.destination;

    let originPiece = board.get(origin);
    if (originPiece === undefined) return false;

    let movementVector = BoardCoordinate.getVector(origin, dest);
    let adjCoord = this.getInBetweenCoordinate(origin, dest);

    let isFirstMove = !movementData.movedPieces.some((v) => originPiece !== undefined && v === originPiece.id);

    return (
             this.isMovingInCorrectDirection(originPiece, movementVector) && 
      			 (
               this.isValidPawnMove(movementVector, board.get(dest)) ||
    			     this.isValidPawnAttack(movementVector, originPiece, board.get(dest))
             )
           ) ||
           (isFirstMove ? this.isValidFirstPawnMove(movementVector, board.get(adjCoord), board.get(dest)) : false);
  }

  private isValidPawnMove(moveVector: Vector2, destinationPiece: BoardPiece | undefined): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnMove.equals(normalizedVector) && 
  				 destinationPiece === undefined;
  }

  private isValidPawnAttack(moveVector: Vector2, originPiece: BoardPiece, destinationPiece: BoardPiece | undefined): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnAttack.equals(normalizedVector) &&
  				 destinationPiece !== undefined &&
  				 destinationPiece.team !== originPiece.team;
  }

  private isValidFirstPawnMove(moveVector: Vector2, skippedPiece: BoardPiece | undefined, destinationPiece: BoardPiece | undefined): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnInitialMove.equals(normalizedVector) &&
  				 skippedPiece === undefined &&
  				 destinationPiece === undefined;
  }

  private isMovingInCorrectDirection(originPiece: BoardPiece, moveVector: Vector2): boolean {
  	if (originPiece.team === Team.White) {
  		return moveVector.y > 0;
  	} else {
  		return moveVector.y < 0;
  	}
  }

  private getInBetweenCoordinate(origin: BoardCoordinate, destination: BoardCoordinate): BoardCoordinate {
  	let vector = BoardCoordinate.getVector(origin, destination);
		var offset: number;

		if (vector.y < 0) {
			offset = -1;
		} else {
			offset = 1;
		}

		return BoardCoordinate.at(origin.col, origin.row + offset);
  }

  private static getAbsoluteVectorForPawn(moveVector: Vector2): Vector2 {
    return new Vector2(Math.abs(moveVector.x), Math.abs(moveVector.y));
  }
}