import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import Board from '../../../models/Board';
import BoardPieceType from '../../../models/enums/BoardPieceType';
import PieceMovementJudgeFactory from '../../PieceMovementJudgeFactory';
import { Vector2 } from 'three';

class ChessMovementJudge implements MovementJudge {
  private readonly chessPieceMovementJudgeFactory: PieceMovementJudgeFactory;
  private readonly chessPieceMovementJudges: Map<BoardPieceType, MovementJudge>;

  constructor(chessPieceMovementJudgeFactory: PieceMovementJudgeFactory) {
    this.chessPieceMovementJudgeFactory = chessPieceMovementJudgeFactory;
    this.chessPieceMovementJudges = new Map<BoardPieceType, MovementJudge>();
  }

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let movementJudge = this.getMovementJudge(originPiece.type);

    return movementJudge.isLegalMove(origin, destination, board);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let movementJudge = this.getMovementJudge(originPiece.type);

    return movementJudge.isLegalFirstMove(origin, destination, board);
  }

  private getMovementJudge(pieceType: BoardPieceType) {
    let movementJudge = this.chessPieceMovementJudges.get(pieceType);
    if (movementJudge === undefined) {
      movementJudge = this.chessPieceMovementJudgeFactory.createPieceMovementJudge(pieceType);
      this.chessPieceMovementJudges.set(pieceType, movementJudge);
    }

    return movementJudge;
  }
}

export default ChessMovementJudge;
