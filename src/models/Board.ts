import BoardTile from './BoardTile';
import BoardCoordinate from './BoardCoordinate';
import { Color, Group } from 'three';

class Board {
  private boardmap: Map<BoardCoordinate, BoardTile> = new Map<BoardCoordinate, BoardTile>();
  private renderableBoard: Group = new Group();

  constructor(height: number, length: number) {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < length; j++) {
        let boardTile =  new BoardTile(Board.getTileColor(i, j), undefined);
        let boardCoord = new BoardCoordinate(j + 1, i + 1);

        this.boardmap.set(boardCoord, boardTile);

        this.addTileToRenderableBoard(boardTile, boardCoord);
      }
    }
  }

  private addTileToRenderableBoard(boardTile: BoardTile, tileCoordinate: BoardCoordinate) {
    let renderableTile = boardTile.getRenderableTile();
    renderableTile.translateY(tileCoordinate.row);
    renderableTile.translateX(tileCoordinate.col);
    renderableTile.userData = tileCoordinate;

    this.renderableBoard.add(renderableTile);
  }

  public get(coord: BoardCoordinate): BoardTile {
    let foundTile: BoardTile | null = null;
    this.boardmap.forEach((tile, coordinate) => {
      if (coord.Equals(coordinate)) {
        foundTile = tile;
      }
    })

    if (foundTile !== null) {
      return foundTile;
    } else {
      throw new Error(`${coord.toString()} is not a coordinate on the board.`);
    }
  }

  public getRenderableBoard() {
    return this.renderableBoard;
  }

  private static getTileColor(row: number, col: number) {
    if ((row + col) % 2 === 0) {
      return new Color("black");
    } else {
      return new Color("white");
    }
  }
}

export default Board;
