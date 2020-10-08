import MovementJudge from '../../src/business/MovementJudge';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import Board from '../../src/models/Board';
import MovementData from '../../src/models/MovementData';

class TestMovementJudge implements MovementJudge {
  private isLegalMoveValue: boolean;
  private isLegalFirstMove: boolean;

  constructor(isLegalMove: boolean, isLegalFirstMove: boolean) {
    this.isLegalMoveValue = isLegalMove;
    this.isLegalFirstMove = isLegalFirstMove;
  }

  isLegalMove(mvDta: MovementData) : boolean{
    let origPiece = mvDta.board.get(mvDta.origin).getPiece();
    if (origPiece === undefined) {
      return this.isLegalMoveValue;
    }

    if (origPiece !== undefined &&
        !mvDta.movedPieces.some((v) => origPiece !== undefined && v === origPiece.id)) {
      return this.isLegalFirstMove;
    } else {
      return  this.isLegalMoveValue;
    }
  }
}

export default TestMovementJudge;