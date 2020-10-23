import GameStateProcessor from '../GameStateProcessor';
import PieceMovementJudgeFactory from '../PieceMovementJudgeFactory';
import MovementJudge from '../MovementJudge';
import Board from '../../models/Board';
import BoardCoordinate from '../../models/BoardCoordinate';
import BoardPieceType from '../../models/enums/BoardPieceType';
import GameType from '../../models/enums/GameType';
import MovementData from '../../models/MovementData';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessStateProcessor implements GameStateProcessor {
  private readonly pieceMovementJudgeFactory: PieceMovementJudgeFactory;
  private readonly pieceMovementJudges: Map<BoardPieceType, MovementJudge>;

  private playingTeam = "white";

  private logicBoard: Board = new Board(0, 0);
  private attackCoords = new Array<BoardCoordinate>();
  private opponentPieceCoords = new Array<BoardCoordinate>();
  private defendingPieceCoords = new Array<BoardCoordinate>();
  private kingCoord: BoardCoordinate|undefined;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) abstractPieceMovementJudgeFactory: (type: GameType) => PieceMovementJudgeFactory) {
    this.pieceMovementJudgeFactory = abstractPieceMovementJudgeFactory(GameType.Chess);
    this.pieceMovementJudges = new Map<BoardPieceType, MovementJudge>();
  }

  public isGameOver(board: Board): boolean {
    this.logicBoard = board.cloneBoardForLogic();
    this.getPieceCoordinates();
    let attackingPieces = this.getAttackingPieces();

    if (attackingPieces.length > 1) {
      return this.canKingMoveOutOfCheck();
    } else if (attackingPieces.length === 1) {
      return this.canKingMoveOutOfCheck() || this.canAnyPieceInterfereInAttack();
    } else {
      return false;
    }
  }

  private getPieceCoordinates() {
    let whitePieceCoords = new Array<BoardCoordinate>();
    let blackPieceCoords = new Array<BoardCoordinate>();
    let whiteKingCoord = undefined;
    let blackKingCoord = undefined;

    this.logicBoard.boardmap.forEach((tile, coord) => {
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

    let defendingTeam = this.whoseTurnIsIt();
    if (defendingTeam === "white" && whiteKingCoord !== undefined) {
      this.opponentPieceCoords = blackPieceCoords;
      this.defendingPieceCoords = whitePieceCoords;
      this.kingCoord = whiteKingCoord;
    } else if (defendingTeam === "black" && blackKingCoord !== undefined) {
      this.opponentPieceCoords = whitePieceCoords;
      this.defendingPieceCoords = blackPieceCoords;
      this.kingCoord = blackKingCoord;
    } else {
      throw new Error("Unable to process game over since the pieces aren't in the right place");
    }
  }

  private getAttackingPieces(): Array<BoardCoordinate> {
    let attackingPieces = new Array<BoardCoordinate>();

    let chessStateProcessor = this;
    this.opponentPieceCoords.forEach(function(pieceCoord) {
      let originPiece = chessStateProcessor.logicBoard.get(pieceCoord).getPiece();

      if (originPiece !== undefined && chessStateProcessor.kingCoord !== undefined) {
        let movementJudge = chessStateProcessor.getMovementJudge(originPiece.type);
        let mvDta = new MovementData(pieceCoord, chessStateProcessor.kingCoord, chessStateProcessor.logicBoard);

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
      movementJudge = this.pieceMovementJudgeFactory.createPieceMovementJudge(pieceType);
      this.pieceMovementJudges.set(pieceType, movementJudge);
    }

    return movementJudge;
  }

  public logMove(board: Board, mvDta: MovementData): void {
    this.changePlayingTeam();
  }

  private changePlayingTeam() {
    if (this.playingTeam === "white") {
      this.playingTeam = "black";
    } else {
      this.playingTeam = "white";
    }
  }

  public getScore(): string {
    return "-1";
  }

  public getMoveHistory(): string {
    return "hist";
  }

  public whoseTurnIsIt(): string {
    return this.playingTeam;
  }
}

export default ChessStateProcessor;