import { MovementJudge } from '../../src/business/MovementJudge';
import { BoardCoordinate } from '../../src/models/BoardCoordinate';
import { Board } from '../../src/models/Board';
import { MovementData } from '../../src/models/MovementData';

export class TargetedMovementJudge implements MovementJudge {
  private targets: Array<BoardCoordinate>;

  constructor(targets: Array<BoardCoordinate>) {
    this.targets = targets;
  }

  isLegalMove(mvDta: MovementData) : boolean{
    let origPiece = mvDta.board.get(mvDta.origin);
    if (origPiece === undefined) {
      return false;
    }

   return this.targets.some((v) => v.Equals(mvDta.destination));
  }
}