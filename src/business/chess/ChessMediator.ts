import BoardCoordinate from '../../models/BoardCoordinate';
import Board from '../../models/Board';
import BoardBuilder from '../BoardBuilder';
import GameType from '../../models/enums/GameType';
import GameMediator from '../GameMediator';
import MovementJudge from '../MovementJudge';

import { Group } from 'three';

class ChessMediator implements GameMediator {
  private readonly boardBuilder: BoardBuilder;
	private readonly board: Board;
  private readonly movementJudge: MovementJudge;
  private readonly movedPieces: Array<string>;

	constructor(boardBuilder: BoardBuilder, movementJudge: MovementJudge) {
    this.boardBuilder = boardBuilder;
		this.board = boardBuilder.createBoard();
    this.movementJudge = movementJudge;
    this.movedPieces = new Array<string>();
	}

  public lookAtBoard(): Board {
    return this.board;
  }

  public loadBoard(callback: (x: Group) => void) {
      
  }

  public move(origin: BoardCoordinate, destination: BoardCoordinate): boolean {
    if (this.isLegalMove(origin, destination)) {
      let originTile = this.board.get(origin);
      this.board.get(destination).setPiece(originTile.getPiece());
      originTile.setPiece(undefined);

      return true;
    }

    return false;
  }

  private isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate) {
    let originPiece = this.board.get(origin).getPiece();
    if (originPiece === undefined) return;

    if (this.movedPieces.some((v) => { return originPiece !== undefined && v === originPiece.id})) {
      return this.movementJudge.isLegalMove(origin, destination, this.board);
    } else {
      this.movedPieces.push(originPiece.id);
      return this.movementJudge.isLegalFirstMove(origin, destination, this.board);
    }
  }
}

export default ChessMediator;
