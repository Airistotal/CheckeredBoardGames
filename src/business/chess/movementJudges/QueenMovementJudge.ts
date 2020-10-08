import MovementJudge from '../../MovementJudge';
import BishopMovementJudge from '../../chess/movementJudges/BishopMovementJudge';
import RookMovementJudge from '../../chess/movementJudges/RookMovementJudge';
import MovementData from '../../../models/MovementData';

class QueenMovementJudge implements MovementJudge {
  private readonly bishopMovementJudge: BishopMovementJudge;
  private readonly rookMovementJudge: RookMovementJudge;

  constructor(bishopMovementJudge: BishopMovementJudge, rookMovementJudge: RookMovementJudge) {
    this.bishopMovementJudge = bishopMovementJudge;
    this.rookMovementJudge = rookMovementJudge;
  }

  public isLegalMove(movementData: MovementData): boolean {
    return this.rookMovementJudge.isLegalMove(movementData) ||
           this.bishopMovementJudge.isLegalMove(movementData);
  }
}

export default QueenMovementJudge;