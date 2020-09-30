import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import Board from '../../../models/Board';

class PawnMovementJudge implements MovementJudge {
  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return true;
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    return true;
  }
}

export default PawnMovementJudge;