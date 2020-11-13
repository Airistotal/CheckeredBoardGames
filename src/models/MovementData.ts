import BoardCoordinate from './BoardCoordinate';
import Board from './Board';

class MovementData {
  public origin: BoardCoordinate = BoardCoordinate.at(0, 0);
  public destination: BoardCoordinate = BoardCoordinate.at(0, 0);
  public board: Board = new Board(0, 0);
  public movedPieces: Array<string> = new Array<string>();
  public whiteKing: BoardCoordinate;
  public whitePieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public blackKing: BoardCoordinate;
  public blackPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  constructor(origin: BoardCoordinate,
              destination: BoardCoordinate,
              board: Board,
              whitePieces: Array<BoardCoordinate>,
              blackPieces: Array<BoardCoordinate>,
              movedPieces?: Array<string>) {
    this.origin = origin;
    this.destination = destination;
    this.board = board;
    this.whitePieces = whitePieces;
    this.blackPieces = blackPieces;

    if (movedPieces !== undefined) {
      this.movedPieces = this.movedPieces.concat(movedPieces);
    }
  }
}

export default MovementData;