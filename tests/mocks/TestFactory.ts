import TestPieceMovementJudgeFactory from './TestPieceMovementJudgeFactory';
import GameType from '../../src/models/enums/GameType';
import IAbstractPieceMovementJudgeFactory from '../../src/business/IAbstractPieceMovementJudgeFactory';
import PieceMovementJudgeFactory from '../../src/business/PieceMovementJudgeFactory';

class TestFactory implements IAbstractPieceMovementJudgeFactory {
  private isLegalMove: boolean;
  private isLegalFirstMove: boolean;

  constructor(isLegalMove: boolean, isLegalFirstMove: boolean) {
    this.isLegalMove = isLegalMove;
    this.isLegalFirstMove = isLegalFirstMove;
  }

  createPieceMovementJudgeFactory(type: GameType): PieceMovementJudgeFactory {
    return new TestPieceMovementJudgeFactory(this.isLegalMove, this.isLegalFirstMove);
  }
}

export default TestFactory