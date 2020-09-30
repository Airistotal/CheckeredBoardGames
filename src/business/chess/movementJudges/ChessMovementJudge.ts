import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import Board from '../../../models/Board';
import BoardPieceType from '../../../models/enums/BoardPieceType';
import { Vector2 } from 'three';

class ChessMovementJudge implements MovementJudge {
  private static Moves = new Map<BoardPieceType, Array<Vector2>>([
    [BoardPieceType.Pawn, [new Vector2(0, 1)]],
    [BoardPieceType.Knight, [new Vector2(1, 2), new Vector2(2, 1)]],
    [BoardPieceType.Bishop, [new Vector2(1, 1)]]
  ]);

  private static SpecialMoves = new Map<BoardPieceType, Array<Vector2>>([
    [BoardPieceType.Pawn, [new Vector2(-1, 1), new Vector2(1, 1)]],
  ]);

  private static FirstMoves = new Map<BoardPieceType, Array<Vector2>>([
    [BoardPieceType.Pawn, [new Vector2(0, 2)]],
  ]);

  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let movementVector = ChessMovementJudge.calculateVector2(origin, destination);

    return this.isInPieceMovement(originPiece.type, movementVector, board.get(destination).GetPiece()) &&
           !this.isBlockedByOtherPiece(origin, destination, board);
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let movementVector = ChessMovementJudge.calculateVector2(origin, destination);

    return this.isInFirstTurnPieceMovement(originPiece.type, movementVector, board.get(destination).GetPiece()) &&
           !this.isBlockedByOtherPiece(origin, destination, board);
  }

  private isInPieceMovement(pieceType: BoardPieceType, moveVector: Vector2, destinationPiece?: BoardPiece) {
    let movementRules = ChessMovementJudge.getMovementRules(pieceType);
    let specialMovementRules = ChessMovementJudge.getSpecialMovementRules(pieceType, destinationPiece);
    let normalizedVector = ChessMovementJudge.normalizeVectorForPiece(pieceType, moveVector);

    return movementRules.some((v) => {
      return normalizedVector.equals(v);
    }) || specialMovementRules.some((v) => {
      return moveVector.equals(v);
    });
  }

  private isInFirstTurnPieceMovement(pieceType: BoardPieceType, moveVector: Vector2, destinationPiece?: BoardPiece) {
    let firstMovementRules = ChessMovementJudge.getFirstMovementRules(pieceType);

    return this.isInPieceMovement(pieceType, moveVector, destinationPiece) || firstMovementRules.some((v) => {
      return moveVector.equals(v);
    });
  }

  private isBlockedByOtherPiece(origin: BoardCoordinate, destination: BoardCoordinate, board: Board): boolean {
    let originPiece = board.get(origin).GetPiece();
    if (originPiece === undefined) return false;

    let destinationPiece = board.get(destination).GetPiece();

    switch(originPiece.type) {
      case BoardPieceType.Pawn: {
        let v = ChessMovementJudge.calculateVector2(origin, destination);

        if (v.equals(new Vector2(0, 2))) {
          let pieceInFront = board.get(BoardCoordinate.at(origin.col, origin.row + 1)).GetPiece();

          return destinationPiece !== undefined || pieceInFront !== undefined;
        } else if (v.equals(new Vector2(1, 1))) {
          return destinationPiece === undefined || destinationPiece.team === originPiece.team;
        } else {
          return destinationPiece !== undefined;
        };
      }
      case BoardPieceType.Knight: {
        return destinationPiece === undefined ? false : destinationPiece.team === originPiece.team;
      }
      default: {
        return true;
      }
    }
  }

  private static getMovementRules(pieceType: BoardPieceType): Array<Vector2> {
    let movementRules = ChessMovementJudge.Moves.get(pieceType);

    if (movementRules === undefined) {
      movementRules = new Array<Vector2>();
    }

    return movementRules;
  }

  private static getSpecialMovementRules(pieceType: BoardPieceType, destinationPiece?: BoardPiece): Array<Vector2> {
    let movementRules = ChessMovementJudge.SpecialMoves.get(pieceType);

    if (movementRules === undefined ||
       (pieceType === BoardPieceType.Pawn && destinationPiece === undefined)) {
      movementRules = new Array<Vector2>();
    }

    return movementRules;
  }

  private static getFirstMovementRules(pieceType: BoardPieceType): Array<Vector2> {
    let movementRules = ChessMovementJudge.FirstMoves.get(pieceType);

    if (movementRules === undefined) {
      movementRules = new Array<Vector2>();
    }

    return movementRules;
  }

  private static calculateVector2(origin: BoardCoordinate, destination: BoardCoordinate) {
    let x = destination.col - origin.col;
    let y = destination.row - origin.row;

    return new Vector2(x, y);
  }

  private static normalizeVectorForPiece(pieceType: BoardPieceType, moveVector: Vector2): Vector2 {
    return moveVector;
  }
}

export default ChessMovementJudge;
