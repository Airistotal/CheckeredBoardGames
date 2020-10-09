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

      return movementJudge.isLegalMove(movementData) && this.teamKingIsNotInCheck(movementData);
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

  private teamKingIsNotInCheck(mvDta: MovementData): boolean {
    let originPiece = mvDta.board.get(mvDta.origin).getPiece();
    if (originPiece === undefined) return false;
    let originTeam = originPiece.team;

    let logicBoard = mvDta.board.cloneBoardForLogic();
    logicBoard.get(mvDta.destination).setPiece(logicBoard.get(mvDta.origin).getPiece());

    let whitePieceCoords = new Array<BoardCoordinate>();
    let blackPieceCoords = new Array<BoardCoordinate>();
    let whiteKingCoord: BoardCoordinate;
    let blackKingCoord: BoardCoordinate;

    logicBoard.boardmap.forEach((tile, coord) => {
      let piece = tile.getPiece();
      if (piece !== undefined) {
        if (piece.team === "white") {
          if (piece.type === BoardPieceType.King) {
            whiteKingCoord = coord;
          } else {
            whitePieceCoords.push(coord);
          }
        } else if (piece.team === "black") {
          if (piece.type === BoardPieceType.King) {
            blackKingCoord = coord;
          } else {
            blackPieceCoords.push(coord);
          }
        }
      }
    });

    if (originTeam === "black") {
      let blackKingInCheck = false;
      whitePieceCoords.forEach((coord) => {
        let originPiece = logicBoard.get(coord).getPiece();
        if (originPiece === undefined) return false;

        let movementJudge = this.getMovementJudge(originPiece.type);

        let movementData = new MovementData(coord, blackKingCoord, logicBoard, mvDta.movedPieces);
        if (movementJudge.isLegalMove(movementData)) {
          blackKingInCheck = true
        }
      });

      return !blackKingInCheck;
    } else if (originTeam === "white") {
      let whiteKingInCheck = false;

      blackPieceCoords.forEach((coord) => {
        let originPiece = logicBoard.get(coord).getPiece();
        if (originPiece === undefined) return false;

        let movementJudge = this.getMovementJudge(originPiece.type);

        let movementData = new MovementData(coord, whiteKingCoord, logicBoard, mvDta.movedPieces);
        if (movementJudge.isLegalMove(movementData)) {
          whiteKingInCheck = true
        }
      });

      return whiteKingInCheck;
    }

    throw new Error(`I do not know the team ${originTeam}`);
  }
}

export default ChessMovementJudge;
