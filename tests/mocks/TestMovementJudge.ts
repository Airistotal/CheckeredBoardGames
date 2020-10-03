import MovementJudge from '../../src/business/MovementJudge';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import Board from '../../src/models/Board';

class TestMovementJudge implements MovementJudge {
  private isLegalMoveValue: boolean;
  private isLegalFirstMoveValue: boolean;

  constructor(isLegalMove: boolean, isLegalFirstMove: boolean) {
    this.isLegalMoveValue = isLegalMove;
    this.isLegalFirstMoveValue = isLegalFirstMove;
  }

  isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean{
    return this.isLegalMoveValue;
  }

  isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    return this.isLegalFirstMoveValue;
  }
}

export default TestMovementJudge;