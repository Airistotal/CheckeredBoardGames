import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import BoardPieceType from '../../../models/enums/BoardPieceType';
import BoardTile from '../../../models/BoardTile';
import Board from '../../../models/Board';
import MovementData from '../../../models/MovementData';
import { Vector2 } from 'three';

class PawnMovementJudge implements MovementJudge {
  private static PawnMove = new Vector2(0, 1);
  private static PawnInitialMove = new Vector2(0, 2);
  private static PawnAttack = new Vector2(1, 1);

  public static isMoveTwoForward(movementData: MovementData): boolean {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    let originPiece = movementData.board.get(movementData.origin).getPiece();
    let absVector = PawnMovementJudge.getAbsoluteVectorForPawn(mvVector);

    return originPiece !== undefined &&
           originPiece.type === BoardPieceType.Pawn &&
           PawnMovementJudge.PawnInitialMove.equals(absVector);
  }

  public static isEnPassantAttack(movementData: MovementData, ghostId: string): boolean {
    let originPiece = movementData.board.get(movementData.origin).getPiece();
    let attackedPiece = movementData.board.get(movementData.destination).getPiece();

    return attackedPiece !== undefined && attackedPiece.id === ghostId &&
           originPiece !== undefined && originPiece.type === BoardPieceType.Pawn;
  }

  public static getEnPassantCoordinate(movementData: MovementData): BoardCoordinate {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination)
    mvVector.y = 0;

    let enPassantCoordinate = movementData.origin.clone();
    enPassantCoordinate.addVector(mvVector);

    return enPassantCoordinate;
  }

  public static getEnPassantGhostCoordinate(movementData: MovementData): BoardCoordinate {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    mvVector.normalize();

    let enPassantGhostCoord = movementData.origin.clone();
    enPassantGhostCoord.addVector(mvVector);

    return enPassantGhostCoord;
  }

  public isLegalMove(movementData: MovementData) : boolean {
    let board = movementData.board;
    let origin = movementData.origin;
    let dest = movementData.destination;

    let originPiece = board.get(origin).getPiece();
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

  private isValidPawnMove(moveVector: Vector2, destinationTile: BoardTile): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnMove.equals(normalizedVector) && 
  				 destinationTile.getPiece() === undefined;
  }

  private isValidPawnAttack(moveVector: Vector2, originPiece: BoardPiece, destinationTile: BoardTile): boolean {
  	let destinationPiece = destinationTile.getPiece();
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnAttack.equals(normalizedVector) &&
  				 destinationPiece !== undefined &&
  				 destinationPiece.team !== originPiece.team;
  }

  private isValidFirstPawnMove(moveVector: Vector2, skippedTile: BoardTile, destinationTile: BoardTile): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnInitialMove.equals(normalizedVector) &&
  				 skippedTile.getPiece() === undefined &&
  				 destinationTile.getPiece() === undefined;
  }

  private isMovingInCorrectDirection(originPiece: BoardPiece, moveVector: Vector2): boolean {
  	if (originPiece.team === "white") {
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

		return BoardCoordinate.at(origin.getCol(), origin.getRow() + offset);
  }

  private static getAbsoluteVectorForPawn(moveVector: Vector2): Vector2 {
    return new Vector2(Math.abs(moveVector.x), Math.abs(moveVector.y));
  }
}

export default PawnMovementJudge;