import { GameStateProcessor } from '../GameStateProcessor';
import { MovementJudge } from '../MovementJudge';
import { Board } from '../../models/Board';
import { BoardCoordinate } from '../../models/BoardCoordinate';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { GameType } from '../../models/enums/GameType';
import { MovementData } from '../../models/MovementData';
import { Team } from '../../models/enums/Team';
import { FluentMovementDataBuilder } from '../FluentMovementDataBuilder';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessStateProcessor implements GameStateProcessor {
  private readonly pieceMovementJudgeFactory: (type: BoardPieceType) => MovementJudge;
  private readonly pieceMovementJudges: Map<BoardPieceType, MovementJudge>;

  private playingTeam = Team.White;

  private logicBoard: Board = new Board(0, 0);
  private attackCoords = new Array<BoardCoordinate>();
  private opponentPieceCoords = new Array<BoardCoordinate>();
  private defendingPieceCoords = new Array<BoardCoordinate>();
  private defendingKingCoord: BoardCoordinate|undefined;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) abstractPieceMovementJudgeFactory: (type: GameType) => (type: BoardPieceType) => MovementJudge) {
    this.pieceMovementJudgeFactory = abstractPieceMovementJudgeFactory(GameType.Chess);
    this.pieceMovementJudges = new Map<BoardPieceType, MovementJudge>();
  }

  public isGameOverForTeam(board: Board, team: Team): boolean {
    this.logicBoard = board.cloneBoardForLogic();
    this.getPieceCoordinates(team);
    let attackingPieces = this.getAttackingPieces();

    if (attackingPieces.length > 1) {
      return this.canKingMoveOutOfCheck();
    } else if (attackingPieces.length === 1) {
      return this.canKingMoveOutOfCheck() || this.canAnyPieceInterfereInAttack();
    } else {
      return false;
    }
  }

  private getPieceCoordinates(team: Team) {
    this.logicBoard.boardmap.forEach((tile, coord) => {
      let piece = tile.getPiece();
      if (piece !== undefined) {
        if (piece.team === team) {
          if (piece.type === BoardPieceType.King) {
            this.defendingKingCoord = coord;
          } else {
            this.defendingPieceCoords.push(coord);
          }
        } else if (piece.team !== team) {
          if (piece.type !== BoardPieceType.King) {
            this.opponentPieceCoords.push(coord);
          }
        }
      }
    });
  }

  private getAttackingPieces(): Array<BoardCoordinate> {
    let attackingPieces = new Array<BoardCoordinate>();

    let chessStateProcessor = this;
    this.opponentPieceCoords.forEach(function(pieceCoord) {
      let originPiece = chessStateProcessor.logicBoard.get(pieceCoord);

      if (originPiece !== undefined && chessStateProcessor.defendingKingCoord !== undefined) {
        let movementJudge = chessStateProcessor.getMovementJudge(originPiece.type);
        let mvDta = FluentMovementDataBuilder
          .MovementData()
          .from(pieceCoord)
          .to(chessStateProcessor.defendingKingCoord)
          .on(chessStateProcessor.logicBoard);

        if (movementJudge.isLegalMove(mvDta)) {
          attackingPieces.push(pieceCoord);
        }
      }
    });

    return attackingPieces;
  }

  private canAnyPieceInterfereInAttack(): boolean {
    return true;
  }

  private canKingMoveOutOfCheck(): boolean {
    return true;
  }

  private getMovementJudge(pieceType: BoardPieceType) {
    let movementJudge = this.pieceMovementJudges.get(pieceType);
    if (movementJudge === undefined) {
      movementJudge = this.pieceMovementJudgeFactory(pieceType);
      this.pieceMovementJudges.set(pieceType, movementJudge);
    }

    return movementJudge;
  }

  public logMove(board: Board, mvDta: MovementData): void {
    this.changePlayingTeam();
  }

  private changePlayingTeam() {
    if (this.playingTeam === Team.White) {
      this.playingTeam = Team.Black;
    } else {
      this.playingTeam = Team.White;
    }
  }

  public getScore(): string {
    return "-1";
  }

  public getMoveHistory(): string {
    return "hist";
  }

  public whoseTurnIsIt(): Team {
    return this.playingTeam;
  }
}