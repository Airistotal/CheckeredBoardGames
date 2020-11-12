import MovementJudge from '../../MovementJudge';
import BoardCoordinate from '../../../models/BoardCoordinate';
import BoardPiece from '../../../models/BoardPiece';
import Board from '../../../models/Board';
import GameType from '../../../models/enums/GameType';
import Team from '../../../models/enums/Team';
import MovementData from '../../../models/MovementData';
import BoardPieceType from '../../../models/enums/BoardPieceType';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessMovementJudge implements MovementJudge {
  private readonly pieceMovementJudgeFactory: (type: BoardPieceType) => MovementJudge;
  private readonly pieceMovementJudges: Map<BoardPieceType, MovementJudge>;
  private logicBoard: Board = new Board(0, 0);
  private whitePieceCoords = new Array<BoardCoordinate>();
  private blackPieceCoords = new Array<BoardCoordinate>();
  private whiteKingCoord: BoardCoordinate|undefined;
  private blackKingCoord: BoardCoordinate|undefined;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) abstractPieceMovementJudgeFactory: (type: GameType) => (type: BoardPieceType) => MovementJudge) {
    this.pieceMovementJudgeFactory = abstractPieceMovementJudgeFactory(GameType.Chess);
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
      movementJudge = this.pieceMovementJudgeFactory(pieceType);
      this.pieceMovementJudges.set(pieceType, movementJudge);
    }

    return movementJudge;
  }

  private teamKingIsNotInCheck(mvDta: MovementData): boolean {
    let originPiece = mvDta.board.get(mvDta.origin).getPiece();
    if (originPiece === undefined) return false;
    let originTeam = originPiece.team;

    this.logicBoard = mvDta.board.cloneBoardForLogic();
    this.logicBoard.get(mvDta.destination).setPiece(this.logicBoard.get(mvDta.origin).getPiece());
    this.logicBoard.get(mvDta.origin).setPiece(undefined);
    this.setPieceCoordinates();

    return !this.isInCheck(originTeam, mvDta.movedPieces);
  }

  private setPieceCoordinates() {
    this.whitePieceCoords = new Array<BoardCoordinate>();
    this.blackPieceCoords = new Array<BoardCoordinate>();
    this.whiteKingCoord = undefined;
    this.blackKingCoord = undefined;

    this.logicBoard.boardmap.forEach((tile, coord) => {
      let piece = tile.getPiece();
      if (piece !== undefined) {
        if (piece.team === Team.White) {
          if (piece.type === BoardPieceType.King) {
            this.whiteKingCoord = coord;
          } else {
            this.whitePieceCoords.push(coord);
          }
        } else if (piece.team === Team.Black) {
          if (piece.type === BoardPieceType.King) {
            this.blackKingCoord = coord;
          } else {
            this.blackPieceCoords.push(coord);
          }
        }
      }
    });
  }

  private isInCheck(originTeam: Team, movedPieces?: Array<string>): boolean {
    let attackingPieces = originTeam === Team.White ? this.blackPieceCoords : this.whitePieceCoords;

    let kingCoord: BoardCoordinate;
    if (originTeam === Team.White && this.whiteKingCoord !== undefined) {
      kingCoord = this.whiteKingCoord;
    } else if (originTeam === Team.Black && this.blackKingCoord !== undefined) {
      kingCoord = this.blackKingCoord;
    } else {
      return false;
    }

    let kingInCheck = false;
    attackingPieces.forEach((coord) => {
      let originPiece = this.logicBoard.get(coord).getPiece();
      if (originPiece === undefined) return false;

      let movementJudge = this.getMovementJudge(originPiece.type);

      let movementData = new MovementData(coord, kingCoord, this.logicBoard, movedPieces);
      if (movementJudge.isLegalMove(movementData)) {
        kingInCheck = true
      }
    });

    return kingInCheck;
  }
}

export default ChessMovementJudge;
