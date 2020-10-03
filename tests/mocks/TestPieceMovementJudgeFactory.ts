import TestMovementJudge from './TestMovementJudge';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import MovementJudge from '../../src/business/MovementJudge';
import PieceMovementJudgeFactory from '../../src/business/PieceMovementJudgeFactory';

class TestPieceMovementJudgeFactory implements PieceMovementJudgeFactory {
  private isLegalMove: boolean;
  private isLegalFirstMove: boolean;

  constructor(isLegalMove: boolean, isLegalFirstMove: boolean) {
    this.isLegalMove = isLegalMove;
    this.isLegalFirstMove = isLegalFirstMove;
  }

  createPieceMovementJudge(pieceType: BoardPieceType): MovementJudge {
    return new TestMovementJudge(this.isLegalMove, this.isLegalFirstMove);
  }
}

export default TestPieceMovementJudgeFactory;