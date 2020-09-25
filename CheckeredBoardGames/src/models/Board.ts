import BoardTile from './BoardTile';
import BoardCoordinate from './BoardCoordinate';

class Board {
  private board: Map<BoardCoordinate, BoardTile> = new Map<BoardCoordinate, BoardTile>();

  constructor() {
    this.createBoard(8, 8);
  }

  private createBoard(height: number, length: number) {
    for (var i = 0; i < height; i++) {
      let rowName = i + 1;
      let columnName = 'a';

      for (var j = 0; j < length; j++) {
        this.board.set(new BoardCoordinate(columnName, rowName), new BoardTile(null));

        columnName = String.fromCharCode(columnName.charCodeAt(0) + 1);
      }
    }
  }

  public get(coord: string) {

  }

  public move(origin: string, destination: string) {

  }
}

export default Board;
