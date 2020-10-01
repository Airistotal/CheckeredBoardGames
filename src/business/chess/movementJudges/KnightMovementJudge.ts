import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardTile from '../../../models/BoardTile';
import BoardPiece from '../../../models/BoardPiece';
import Board from '../../../models/Board';
import { Vector2 } from 'three';

class KnightMovementJudge implements MovementJudge {
	private static KnightMoves = [new Vector2(2, 1), new Vector2(1, 2)];

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
  	let originPiece = board.get(origin).getPiece();
  	if (originPiece === undefined) return false;

  	let moveVector = BoardCoordinate.getVector(origin, destination);
  	let destinationPiece = board.get(destination).getPiece();

    return KnightMovementJudge.KnightMoves.some((v) => v.equals(this.normalizeVectorForKnight(moveVector))) &&
  				 (destinationPiece === undefined || destinationPiece.team !== originPiece.team);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return this.isLegalMove(origin, destination, board);
  }

  private normalizeVectorForKnight(moveVector: Vector2): Vector2 {
  	return new Vector2(Math.abs(moveVector.x), Math.abs(moveVector.y))
  }
}

export default KnightMovementJudge;