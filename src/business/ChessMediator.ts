import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';
import IBoardFactory from './IBoardFactory';
import GameType from '../models/enums/GameType';
import GameMediator from './GameMediator';

class ChessMediator implements GameMediator {
	private readonly board: Board;

	constructor(boardFactory: IBoardFactory) {
		this.board = boardFactory.createBoard(GameType.Chess);
	}

  public move(origin: BoardCoordinate, destination: BoardCoordinate): void {
    let originTile = this.board.get(origin);
    let destinationTile = this.board.get(destination);

    if (originTile === undefined || destinationTile === undefined) return;

    let originPiece = originTile.GetPiece();

    if (originPiece === undefined) return;

    /*if (originPiece.canMove(BoardCoordinate.getVector(origin, destination))) {
      destinationTile.SetPiece(originTile.GetPiece());
      originTile.SetPiece(undefined);
    }*/
  }

  public lookAtBoard(): Board {
    return this.board;
  }
}

export default ChessMediator;
