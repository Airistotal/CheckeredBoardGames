import BoardCoordinate from '../../models/BoardCoordinate';
import Board from '../../models/Board';
import MovementData from '../../models/MovementData';
import BoardPieceType from '../../models/enums/BoardPieceType';
import BoardBuilder from '../BoardBuilder';
import BoardPiece from '../../models/BoardPiece';
import GameType from '../../models/enums/GameType';
import GameMediator from '../GameMediator';
import GameStateProcessor from '../GameStateProcessor';
import MovementJudge from '../MovementJudge';
import KingMovementJudge from '../chess/movementJudges/KingMovementJudge';
import PawnMovementJudge from '../chess/movementJudges/PawnMovementJudge';

import { Group, Mesh } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessMediator implements GameMediator {
  private board!: Board;
  private readonly movedPieces: Array<string>;
  private currentTeamTurn: string = "white";
  private enPassantGhost = new BoardPiece("gray", BoardPieceType.Pawn, new Mesh());
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

  public lookAtBoard(): Board {
    return this.board;
  }

  public loadBoard(): Promise<Board> {
    let self = this;
    let boardPromise = this.boardBuilder.createBoard();
    boardPromise.then((board: Board) => {
      self.board = board;
    });

    return boardPromise;
  }

  public move(origin: BoardCoordinate, destination: BoardCoordinate): boolean {
    let mvDta = new MovementData(origin, destination, this.board, this.movedPieces);

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
        this.board.get(this.enPassantGhostCoord).setPiece(undefined);
        this.enPassantGhostCoord = undefined;
      }
      this.enPassantGhostCoord = PawnMovementJudge.getEnPassantGhostCoordinate(mvDta);
      this.board.get(this.enPassantGhostCoord)
                .setPiece(this.enPassantGhost);
    } else if (PawnMovementJudge.isEnPassantAttack(mvDta, this.enPassantGhost.id)) {
      this.board.get(PawnMovementJudge.getEnPassantCoordinate(mvDta))
                .setPiece(undefined);
      this.enPassantGhostCoord = undefined;
    } else {
      if (this.enPassantGhostCoord !== undefined) {
        this.board.get(this.enPassantGhostCoord).setPiece(undefined);
        this.enPassantGhostCoord = undefined;
      }
    }
  }

  private executeMove(origin: BoardCoordinate, destination: BoardCoordinate) {
    let originTile = this.board.get(origin);
    let originPiece = originTile.getPiece();
    
    if (originPiece !== undefined) {  
      this.movedPieces.push(originPiece.id);
    }

    this.board.get(destination).setPiece(originPiece);
    originTile.setPiece(undefined);
  }

  private isLegalMove(mvDta: MovementData): boolean {
    let originPiece = this.board.get(mvDta.origin).getPiece();
    if (originPiece === undefined || originPiece.team !== this.currentTeamTurn) return false;

    return this.movementJudge.isLegalMove(mvDta);
  }

  private rotateTeam(): void {
    this.currentTeamTurn = this.currentTeamTurn === "white" ? "black" : "white";
  }
}

export default ChessMediator;
