import BoardCoordinate from '../../models/BoardCoordinate';
import Board from '../../models/Board';
import MovementData from '../../models/MovementData';
import BoardPieceType from '../../models/enums/BoardPieceType';
import BoardBuilder from '../BoardBuilder';
import BoardPiece from '../../models/BoardPiece';
import GameType from '../../models/enums/GameType';
import GameMediator from '../GameMediator';
import MovementJudge from '../MovementJudge';
import KingMovementJudge from '../chess/movementJudges/KingMovementJudge';
import PawnMovementJudge from '../chess/movementJudges/PawnMovementJudge';

import { Group, Mesh } from 'three';

class ChessMediator implements GameMediator {
  private readonly boardBuilder: BoardBuilder;
	private board!: Board;
  private readonly movementJudge: MovementJudge;
  private readonly movedPieces: Array<string>;
  private currentTeamTurn: string = "white";
  private enPassantGhost = new BoardPiece("gray", BoardPieceType.Pawn, new Mesh());
  private enPassantGhostCoord: BoardCoordinate | undefined;

	constructor(boardBuilder: BoardBuilder, movementJudge: MovementJudge) {
    this.boardBuilder = boardBuilder;
    this.movementJudge = movementJudge;
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
      }
      this.enPassantGhostCoord = PawnMovementJudge.getEnPassantGhostCoordinate(mvDta);
      this.board.get(this.enPassantGhostCoord)
                .setPiece(this.enPassantGhost);
    } else if (PawnMovementJudge.isEnPassantAttack(mvDta, this.enPassantGhost.id)) {
      this.board.get(PawnMovementJudge.getEnPassantCoordinate(mvDta))
                .setPiece(undefined);
    } else {
      if (this.enPassantGhostCoord !== undefined) {
        this.board.get(this.enPassantGhostCoord).setPiece(undefined);
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
