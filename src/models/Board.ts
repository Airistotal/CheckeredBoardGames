import BoardTile from './BoardTile';
import BoardCoordinate from './BoardCoordinate';

class Board {
  private board: Map<BoardCoordinate, BoardTile> = new Map<BoardCoordinate, BoardTile>();

  constructor() {
    this.createBoard(8, 8);
  }

  private createBoard(height: number, length: number) {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < length; j++) {
        this.board.set(
          new BoardCoordinate(j + 1, i + 1),
          new BoardTile(undefined));
      }
    }
  }

  public get(coord: BoardCoordinate) {
    return this.board.get(coord);
  }

  public move(origin: BoardCoordinate, destination: BoardCoordinate) {
    let originTile = this.get(origin);
    let destinationTile = this.get(destination);

    if (originTile === undefined || destinationTile === undefined) return;

    let originPiece = originTile.GetPiece();

    if (originPiece === undefined) return;

    /*if (originPiece.canMove(BoardCoordinate.getVector(origin, destination))) {
      destinationTile.SetPiece(originTile.GetPiece());
      originTile.SetPiece(undefined);
    }*/
  }
}

export default Board;
