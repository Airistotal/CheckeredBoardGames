import TargetedMovementJudge from './TargetedMovementJudge';
import TestMovementJudge from './TestMovementJudge';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import MovementJudge from '../../src/business/MovementJudge';
import PieceMovementJudgeFactory from '../../src/business/PieceMovementJudgeFactory';

class TargetedPieceMovementJudgeFactory implements PieceMovementJudgeFactory {
  private targets: Array<BoardCoordinate>;

  constructor(targets: Array<BoardCoordinate>) {
  	this.targets = targets;
  }

  createPieceMovementJudge(pieceType: BoardPieceType): MovementJudge {
  	if (pieceType === BoardPieceType.King) {
  		return new TestMovementJudge(true, true);
  	} else {
    	return new TargetedMovementJudge(this.targets);
  	}
  }
}

export default TargetedPieceMovementJudgeFactory;