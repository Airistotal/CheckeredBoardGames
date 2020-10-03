import IMovementJudgeFactory from '../../src/business/IMovementJudgeFactory';
import MovementJudge from '../../src/business/MovementJudge';
import TestMovementJudge from '../mocks/TestMovementJudge';
import GameType from '../../src/models/enums/GameType';

class TestMovementJudgeFactory implements IMovementJudgeFactory {
  private isLegalMove: boolean;
  private isLegalFirstMove: boolean;

  constructor(isLegalMove: boolean, isLegalFirstMove: boolean) {
    this.isLegalMove = isLegalMove;
    this.isLegalFirstMove = isLegalFirstMove;
  }

  createMovementJudge(type: GameType): MovementJudge {
    return new TestMovementJudge(this.isLegalMove, this.isLegalFirstMove);
  }
}

export default TestMovementJudgeFactory;