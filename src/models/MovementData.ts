import BoardCoordinate from './BoardCoordinate';
import Board from './Board';

class MovementData {
  public readonly origin: BoardCoordinate = BoardCoordinate.at(0, 0);
  public readonly destination: BoardCoordinate = BoardCoordinate.at(0, 0);
  public readonly board: Board = new Board(0, 0);
  public readonly movedPieces: Array<string> = new Array<string>();

  constructor(origin: BoardCoordinate, destination: BoardCoordinate, board: Board, movedPieces?: Array<string>) {
    this.origin = origin;
    this.destination = destination;
    this.board = board;

    if (movedPieces !== undefined) {
      this.movedPieces = this.movedPieces.concat(movedPieces);
    }
  }
}

export default MovementData;