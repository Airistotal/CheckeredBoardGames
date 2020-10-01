import MovementJudge from '../../MovementJudge';
import BishopMovementJudge from '../../chess/movementJudges/BishopMovementJudge';
import RookMovementJudge from '../../chess/movementJudges/RookMovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import Board from '../../../models/Board';

class QueenMovementJudge implements MovementJudge {
  private readonly bishopMovementJudge: BishopMovementJudge;
  private readonly rookMovementJudge: RookMovementJudge;

  constructor(bishopMovementJudge: BishopMovementJudge, rookMovementJudge: RookMovementJudge) {
    this.bishopMovementJudge = bishopMovementJudge;
    this.rookMovementJudge = rookMovementJudge;
  }

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return this.rookMovementJudge.isLegalMove(origin, destination, board) ||
           this.bishopMovementJudge.isLegalMove(origin, destination, board);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return this.isLegalMove(origin, destination, board);
  }
}

export default QueenMovementJudge;