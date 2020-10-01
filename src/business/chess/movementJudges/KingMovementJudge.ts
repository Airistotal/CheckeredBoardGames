import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import Board from '../../../models/Board';
import { Vector2 } from 'three';

class KingMovementJudge implements MovementJudge {
  private static KingMoves = [new Vector2(0, 1), new Vector2(1, 0), new Vector2(1, 1)];
  private static Castling = new Vector2(2,  0);

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    let originPiece = board.get(origin).getPiece()
    if (originPiece === undefined) return false;

    let moveVector = BoardCoordinate.getVector(origin, destination);
    let destinationPiece = board.get(destination).getPiece();

    return KingMovementJudge.KingMoves.some((v) => v.equals(this.getAbsoluteVectorForKing(moveVector))) &&
           (destinationPiece === undefined || destinationPiece.team !== originPiece.team);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return this.isLegalMove(origin, destination, board) || this.isLegalCastle(origin, destination, board);
  }

  private isLegalCastle(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    let moveVector = BoardCoordinate.getVector(origin, destination);
    let destinationPiece = board.get(destination).getPiece();
    let adjacentMovement = moveVector.x < 0 ? -1 : 1;
    let adjacentPiece = board.get(BoardCoordinate.at(origin.col + adjacentMovement, origin.row)).getPiece()

    return KingMovementJudge.Castling.equals(this.getAbsoluteVectorForKing(moveVector)) &&
           destinationPiece === undefined &&
           adjacentPiece === undefined;
  }

  private getAbsoluteVectorForKing(v: Vector2): Vector2 {
    return new Vector2(Math.abs(v.x), Math.abs(v.y));
  }
}

export default KingMovementJudge;