import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import Board from '../../../models/Board';
import { Vector2 } from 'three';

class BishopMovementJudge implements MovementJudge {
	private static BishopMove = new Vector2(1, 1);

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
  	let originPiece = board.get(origin).GetPiece();
  	if (originPiece === undefined) return false;

  	let moveVector = BoardCoordinate.getVector(origin, destination);
  	let destinationPiece = board.get(destination).GetPiece();

    return BishopMovementJudge.BishopMove.equals(this.getAbsoluteVectorForBishop(moveVector)) &&
    			 this.missOtherPieces(origin, destination, board) &&
    			 (destinationPiece === undefined || originPiece.team !== destinationPiece.team);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return this.isLegalMove(origin, destination, board);
  }

  private missOtherPieces(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    let moveVector = BoardCoordinate.getVector(origin, destination).clampScalar(-1, 1);
    let originVector = BoardCoordinate.getVector(BoardCoordinate.at(0, 0), origin);
    let destinationVector = BoardCoordinate.getVector(BoardCoordinate.at(0, 0), destination);

    originVector = originVector.add(moveVector);
    while (!originVector.equals(destinationVector)) {
      let targetPiece = board.get(BoardCoordinate.at(originVector.x, originVector.y)).GetPiece();
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

export default BishopMovementJudge;