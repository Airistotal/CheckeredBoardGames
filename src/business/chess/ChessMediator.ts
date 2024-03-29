import { BoardCoordinate } from '../../models/BoardCoordinate';
import { Board } from '../../models/Board';
import { MovementData } from '../../models/MovementData';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { BoardBuilder } from '../BoardBuilder';
import { BoardPiece } from '../../models/BoardPiece';
import { SelectedPromotion } from '../../models/SelectedPromotion';
import { GameType } from '../../models/enums/GameType';
import { Team } from '../../models/enums/Team';
import { GameMediator } from '../GameMediator';
import { GameStateProcessor } from '../GameStateProcessor';
import { MovementJudge } from '../MovementJudge';
import { KingMovementJudge } from '../chess/movementJudges/KingMovementJudge';
import { PawnMovementJudge } from '../chess/movementJudges/PawnMovementJudge';
import { FluentMovementDataBuilder } from '../FluentMovementDataBuilder';
import { FluentAttackDataBuilder } from '../FluentAttackDataBuilder';
import { PromotionBoxBuilder } from '../PromotionBoxBuilder';
import { BoardPieceBuilder } from '../BoardPieceBuilder';

import { Group, Mesh } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessMediator implements GameMediator {
  private chessGame: Group = new Group();
  private board!: Board;
  private readonly movedPieces: Array<string>;
  public whitePieceCoords!: Array<BoardCoordinate>;
  public blackPieceCoords!: Array<BoardCoordinate>;
  public whiteKingCoord!: BoardCoordinate;
  public blackKingCoord!: BoardCoordinate;
  private currentTeamTurn: Team = Team.White;
  private pawnNeedsPromoting: boolean = false;
  private promotionSquare: BoardCoordinate | undefined;
  private enPassantGhost = new BoardPiece(Team.Ghost, BoardPieceType.Pawn, new Mesh());
  private enPassantGhostCoord: BoardCoordinate | undefined;
  
  private readonly boardBuilder: BoardBuilder;
  private readonly movementJudge: MovementJudge;
  private readonly gameStateProcessor: GameStateProcessor;
  private readonly promotionBoxBuilder: PromotionBoxBuilder;
  private readonly boardPieceBuilder: BoardPieceBuilder;

	constructor(@inject(IOCTypes.BoardBuilderFactory) boardBuilderFactory: (type: GameType) => BoardBuilder,
              @inject(IOCTypes.MovementJudgeFactory) movementJudgeFactory: (type: GameType) => MovementJudge,
              @inject(IOCTypes.GameStateProcessorFactory) gameStateProcessorFactory: (type: GameType) => GameStateProcessor,
              @inject(IOCTypes.PromotionBoxBuilderFactory) promotionBoxBuilderFactory: (type: GameType) => PromotionBoxBuilder,
              @inject(IOCTypes.BoardPieceBuilderFactory) boardPieceBuilderFactory: (type:GameType) => BoardPieceBuilder) {
    this.boardBuilder = boardBuilderFactory(GameType.Chess);
    this.movementJudge = movementJudgeFactory(GameType.Chess);
    this.gameStateProcessor = gameStateProcessorFactory(GameType.Chess);
    this.promotionBoxBuilder = promotionBoxBuilderFactory(GameType.Chess);
    this.boardPieceBuilder = boardPieceBuilderFactory(GameType.Chess);
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

  public async loadGame(): Promise<Group> {
    await this.promotionBoxBuilder.loadPromotionBoxes();

    let self = this;
    let board = await this.boardBuilder.createBoard();

    this.board = board;
    this.setPieceCoords();

    this.chessGame.add(this.board.getRenderableBoard());

    return this.chessGame;
  }

  public async promote(choice: SelectedPromotion): Promise<boolean> {
    if (this.pawnNeedsPromoting && this.promotionSquare !== undefined) {
      let originPiece = this.board.get(this.promotionSquare);
      if (originPiece === undefined) return false;

      let newPiece = await this.boardPieceBuilder.createBoardPiece(originPiece.team, choice.selectedPieceType);
      this.board.set(this.promotionSquare, newPiece);

      this.pawnNeedsPromoting = false;
      this.promotionSquare = undefined;

      return true;
    }

    return false;
  }

  public getTeamThatWon(): Team | undefined {
    let team = this.currentTeamTurn;

    let attackData = FluentAttackDataBuilder.AttackData()
      .on(this.board)
      .withDefendingKingOn(team === Team.White ? this.whiteKingCoord : this.blackKingCoord)
      .withEnemyPiecesOn(team === Team.White 
        ? this.blackPieceCoords.concat(this.blackKingCoord) 
        : this.whitePieceCoords.concat(this.whiteKingCoord))
      .withAllyPiecesOn(team === Team.White ? this.whitePieceCoords : this.blackPieceCoords)
      .build();

    if (this.gameStateProcessor.isGameOver(attackData)) {
      return this.currentTeamTurn === Team.Black ? Team.White : Team.Black;
    } else {
      return undefined;
    }
  }

  public getPromotionBox(): Group | undefined {
    return this.pawnNeedsPromoting 
      ? this.promotionBoxBuilder.getPromotionBoxes(this.getOppositeTeam(this.currentTeamTurn))
      : undefined;
  }

  public async reset(): Promise<boolean> {
    for( var i = this.chessGame.children.length - 1; i >= 0; i--) { 
      let obj = this.chessGame.children[i];
      this.chessGame.remove(obj);
    }

    await this.loadGame();
    this.currentTeamTurn = Team.White;

    return true;
  }

  public move(origin: BoardCoordinate, destination: BoardCoordinate): boolean {
    let mvDta = this.getMovementData(origin, destination);

    if (this.isLegalMove(mvDta)) {
      this.processCastling(mvDta);
      this.processEnPassant(mvDta);
      this.executeMove(origin, destination);
      this.processPawnPromotion(mvDta);
      this.rotateTeam();

      return true;
    }

    return false;
  }

  private getMovementData(origin: BoardCoordinate, destination: BoardCoordinate): MovementData {
    let defendingKing = this.currentTeamTurn === Team.White ? this.whiteKingCoord : this.blackKingCoord;
    let opponentPieces = this.currentTeamTurn === Team.White 
      ? this.blackPieceCoords.concat(this.blackKingCoord)
      : this.whitePieceCoords.concat(this.whiteKingCoord);
    let allyPieces = this.currentTeamTurn === Team.White ? this.whitePieceCoords : this.blackPieceCoords;

    return FluentMovementDataBuilder
      .MovementData()
      .from(origin)
      .to(destination)
      .on(this.board)
      .withMovedPieces(this.movedPieces)
      .withEnemyPiecesOn(opponentPieces)
      .withAllyPiecesOn(allyPieces)
      .withDefendingKingOn(defendingKing)
      .build();
  }

  private isLegalMove(mvDta: MovementData): boolean {
    let originPiece = this.board.get(mvDta.origin);
    if (originPiece === undefined || originPiece.team !== this.currentTeamTurn) return false;

    return this.movementJudge.isLegalMove(mvDta);
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

  private processPawnPromotion(mvDta: MovementData): void {
    let destinationPiece = mvDta.board.get(mvDta.destination);

    if (destinationPiece !== undefined &&
        PawnMovementJudge.pawnIsPromoting(mvDta.destination, destinationPiece)) {
      this.pawnNeedsPromoting = true;
      this.promotionSquare = mvDta.destination;
    }
  }

  private rotateTeam(): void {
    this.currentTeamTurn = this.currentTeamTurn === Team.White ? Team.Black : Team.White;
  }

  private getOppositeTeam(team: Team): Team {
    return team === Team.White ? Team.Black : Team.White;
  }
}