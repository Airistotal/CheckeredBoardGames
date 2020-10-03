import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import Board from '../../../models/Board';
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

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).getPiece();
    if (originPiece === undefined) return false;

    let movementJudge = this.getMovementJudge(originPiece.type);

    return movementJudge.isLegalMove(origin, destination, board);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).getPiece();
    if (originPiece === undefined) return false;

    let movementJudge = this.getMovementJudge(originPiece.type);

    return movementJudge.isLegalFirstMove(origin, destination, board);
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
