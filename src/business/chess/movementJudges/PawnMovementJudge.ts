import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import BoardPieceType from '../../../models/enums/BoardPieceType';
import BoardTile from '../../../models/BoardTile';
import Board from '../../../models/Board';
import { Vector2 } from 'three';

class PawnMovementJudge implements MovementJudge {
  private static PawnMove = new Vector2(0, 1);
  private static PawnInitialMove = new Vector2(0, 2);
  private static PawnAttack = new Vector2(1, 1);

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let movementVector = BoardCoordinate.getVector(origin, destination);

    return this.isMovingInCorrectDirection(originPiece, movementVector) && 
    			 (this.isValidPawnMove(movementVector, board.get(destination)) ||
    			 this.isValidPawnAttack(movementVector, originPiece, board.get(destination)));
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let movementVector = BoardCoordinate.getVector(origin, destination);
    let adjCoord = this.getInBetweenCoordinate(origin, destination);

    return this.isMovingInCorrectDirection(originPiece, movementVector) && 
    			 (this.isValidPawnMove(movementVector, board.get(destination)) ||
    			 this.isValidPawnAttack(movementVector, originPiece, board.get(destination)) ||
    			 this.isValidFirstPawnMove(movementVector, board.get(adjCoord), board.get(destination)));
  }

  private isValidPawnMove(moveVector: Vector2, destinationTile: BoardTile): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnMove.equals(normalizedVector) && 
  				 destinationTile.GetPiece() === undefined;
  }

  private isValidPawnAttack(moveVector: Vector2, originPiece: BoardPiece, destinationTile: BoardTile): boolean {
  	let destinationPiece = destinationTile.GetPiece();
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnAttack.equals(normalizedVector) &&
  				 destinationPiece !== undefined &&
  				 destinationPiece.team !== originPiece.team;
  }

  private isValidFirstPawnMove(moveVector: Vector2, skippedTile: BoardTile, destinationTile: BoardTile): boolean {
  	let normalizedVector = PawnMovementJudge.getAbsoluteVectorForPawn(moveVector);

  	return PawnMovementJudge.PawnInitialMove.equals(normalizedVector) &&
  				 skippedTile.GetPiece() === undefined &&
  				 destinationTile.GetPiece() === undefined;
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

		return BoardCoordinate.at(origin.col, origin.row + offset);
  }

  private static getAbsoluteVectorForPawn(moveVector: Vector2): Vector2 {
    return new Vector2(Math.abs(moveVector.x), Math.abs(moveVector.y));
  }
}

export default PawnMovementJudge;