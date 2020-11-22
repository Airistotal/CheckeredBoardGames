import { BoardCoordinate } from '../../models/BoardCoordinate';
import { Board } from '../../models/Board';
import { MovementData } from '../../models/MovementData';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { BoardBuilder } from '../BoardBuilder';
import { BoardPiece } from '../../models/BoardPiece';
import { GameType } from '../../models/enums/GameType';
import { Team } from '../../models/enums/Team';
import { GameMediator } from '../GameMediator';
import { GameStateProcessor } from '../GameStateProcessor';
import { MovementJudge } from '../MovementJudge';
import { KingMovementJudge } from '../chess/movementJudges/KingMovementJudge';
import { PawnMovementJudge } from '../chess/movementJudges/PawnMovementJudge';
import { FluentMovementDataBuilder } from '../FluentMovementDataBuilder';

import { Group, Mesh } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessMediator implements GameMediator {
  private board!: Board;
  private readonly movedPieces: Array<string>;
  private whitePieceCoords!: Array<BoardCoordinate>;
  private blackPieceCoords!: Array<BoardCoordinate>;
  private whiteKingCoord!: BoardCoordinate;
  private blackKingCoord!: BoardCoordinate;
  private currentTeamTurn: Team = Team.White;
  private enPassantGhost = new BoardPiece(Team.Ghost, BoardPieceType.Pawn, new Mesh());
  private enPassantGhostCoord: BoardCoordinate | undefined;
  
  private readonly boardBuilder: BoardBuilder;
  private readonly movementJudge: MovementJudge;
  private readonly gameStateProcessor: GameStateProcessor;

	constructor(@inject(IOCTypes.BoardBuilderFactory) boardBuilderFactory: (type: GameType) => BoardBuilder,
              @inject(IOCTypes.MovementJudgeFactory) movementJudgeFactory: (type: GameType) => MovementJudge,
              @inject(IOCTypes.GameStateProcessorFactory) gameStateProcessorFactory: (type: GameType) => GameStateProcessor) {
    this.boardBuilder = boardBuilderFactory(GameType.Chess);
    this.movementJudge = movementJudgeFactory(GameType.Chess);
    this.gameStateProcessor = gameStateProcessorFactory(GameType.Chess);
    this.movedPieces = new Array<string>();
	}

  private setPieceCoords() {
    this.whitePieceCoords = new Array<BoardCoordinate>();
    this.blackPieceCoords = new Array<BoardCoordinate>();

    this.board.boardmap.forEach((tile, coord) => {
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

  public lookAtBoard(): Board {
    return this.board;
  }

  public loadBoard(): Promise<Board> {
    let self = this;
    let boardPromise = this.boardBuilder.createBoard();
    boardPromise.then((board: Board) => {
      self.board = board;
      self.setPieceCoords();
    });

    return boardPromise;
  }

  public getTeamThatWon(): Team | undefined {
    if (this.gameStateProcessor.isGameOverForTeam(this.board, this.currentTeamTurn)) {
      return this.currentTeamTurn;
    } else {
      return undefined;
    }
  }

  public move(origin: BoardCoordinate, destination: BoardCoordinate): boolean {
    let defendingKing = this.currentTeamTurn === Team.White ? this.whiteKingCoord : this.blackKingCoord;
    let opponentPieces = this.currentTeamTurn === Team.White ? this.blackPieceCoords : this.whitePieceCoords;
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .from(origin)
      .to(destination)
      .on(this.board)
      .withAttackingPiecesOn(opponentPieces)
      .withDefendingKingOn(defendingKing)
      .build();

    if (this.isLegalMove(mvDta)) {
      this.processCastling(mvDta);
      this.processEnPassant(mvDta);
      this.executeMove(origin, destination);
      this.rotateTeam();

      return true;
    }

    return false;
  }

  private processCastling(mvDta: MovementData): void {
    if (KingMovementJudge.isCaslting(mvDta)) {
      let rookOrigin = KingMovementJudge.getCasltingRookOrigin(mvDta);
      let rookDest = KingMovementJudge.getCasltingRookDestination(mvDta);
      this.executeMove(rookOrigin, rookDest);
    }
  }

  private processEnPassant(mvDta: MovementData): void {
    if (PawnMovementJudge.isMoveTwoForward(mvDta)) {
      if (this.enPassantGhostCoord !== undefined) {
        this.board.set(this.enPassantGhostCoord, undefined);
        this.enPassantGhostCoord = undefined;
      }
      this.enPassantGhostCoord = PawnMovementJudge.getEnPassantGhostCoordinate(mvDta);
      this.board.set(this.enPassantGhostCoord, this.enPassantGhost);
    } else if (PawnMovementJudge.isEnPassantAttack(mvDta, this.enPassantGhost.id)) {
      this.board.set(PawnMovementJudge.getEnPassantCoordinate(mvDta), undefined);
      this.enPassantGhostCoord = undefined;
    } else if (this.enPassantGhostCoord !== undefined) {
      this.board.set(this.enPassantGhostCoord, undefined);
      this.enPassantGhostCoord = undefined;
    }
  }

  private executeMove(origin: BoardCoordinate, destination: BoardCoordinate) {
    let originPiece = this.board.get(origin);
    
    if (originPiece !== undefined) {  
      this.movedPieces.push(originPiece.id);

      this.updatePieceCoords(origin, destination);

      this.board.set(destination, originPiece);
      this.board.set(origin, undefined);
    }
  }

  private updatePieceCoords(origin: BoardCoordinate, destination: BoardCoordinate) {
    let originPiece = this.board.get(origin);

    if (originPiece !== undefined) {
      this.removeCoordFromTeam(destination);

      if (originPiece.type === BoardPieceType.King) {
        if (originPiece.team === Team.White) {
          this.whiteKingCoord = destination;
        } else if (originPiece.team === Team.Black) {
          this.blackKingCoord = destination;
        }
      } else {
        this.removeCoordFromTeam(origin);

        if (originPiece.team === Team.White) {
          this.whitePieceCoords.push(destination);
        } else if (originPiece.team === Team.Black) {
          this.blackPieceCoords.push(destination);
        }
      }
    }
  }

  private removeCoordFromTeam(coord: BoardCoordinate) {
    let destinationPiece = this.board.get(coord);

    if (destinationPiece !== undefined) {
      if (destinationPiece.team === Team.Black) {
        let index = this.blackPieceCoords.indexOf(coord);
        this.blackPieceCoords.splice(index, 1);
      } else if (destinationPiece.team === Team.White) {
        let index = this.whitePieceCoords.indexOf(coord);
        this.whitePieceCoords.splice(index, 1);
      }
    }
  }

  private isLegalMove(mvDta: MovementData): boolean {
    let originPiece = this.board.get(mvDta.origin);
    if (originPiece === undefined || originPiece.team !== this.currentTeamTurn) return false;

    return this.movementJudge.isLegalMove(mvDta);
  }

  private rotateTeam(): void {
    this.currentTeamTurn = this.currentTeamTurn === Team.White ? Team.Black : Team.White;
  }
}