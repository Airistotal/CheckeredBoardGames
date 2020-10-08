import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import Board from '../../../models/Board';
import MovementData from '../../../models/MovementData';
import BoardPieceType from '../../../models/enums/BoardPieceType';
import PieceMovementJudgeFactory from '../../PieceMovementJudgeFactory';
import { Vector2 } from 'three';

class ChessMovementJudge implements MovementJudge {
  private readonly pieceMovementJudgeFactory: PieceMovementJudgeFactory;
  private readonly pieceMovementJudges: Map<BoardPieceType, MovementJudge>;

  constructor(pieceMovementJudgeFactory: PieceMovementJudgeFactory) {
    this.pieceMovementJudgeFactory = pieceMovementJudgeFactory;
    this.pieceMovementJudges = new Map<BoardPieceType, MovementJudge>();
  }

  public isLegalMove(movementData: MovementData) : boolean {
    try {
      let originPiece = movementData.board.get(movementData.origin).getPiece();
      if (originPiece === undefined) return false;

      let movementJudge = this.getMovementJudge(originPiece.type);

      return movementJudge.isLegalMove(movementData);
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  private getMovementJudge(pieceType: BoardPieceType) {
    let movementJudge = this.pieceMovementJudges.get(pieceType);
    if (movementJudge === undefined) {
      movementJudge = this.pieceMovementJudgeFactory.createPieceMovementJudge(pieceType);
      this.pieceMovementJudges.set(pieceType, movementJudge);
    }

    return movementJudge;
  }
}

export default ChessMovementJudge;
