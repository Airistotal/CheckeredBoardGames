import BoardTile from './BoardTile';
import BoardCoordinate from './BoardCoordinate';
import BoardPiece from './BoardPiece';
import { Color, Group, Mesh } from 'three';
import Team from '../models/enums/Team';

class Board {
  public boardmap: Map<BoardCoordinate, BoardTile> = new Map<BoardCoordinate, BoardTile>();
  private renderableBoard: Group = new Group();
  private height: number;
  private length: number;

  constructor(height: number, length: number) {
    this.height = height;
    this.length = length;

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
    renderableTile.translateY(tileCoordinate.getRow());
    renderableTile.translateX(tileCoordinate.getCol());
    renderableTile.userData = tileCoordinate;

    this.renderableBoard.add(renderableTile);
  }

  public get(coord: BoardCoordinate): BoardPiece | undefined {
    let foundTile: BoardTile | null = null;

    for (var key in this.boardmap) {
      if (coord.Equals(coordinate)) {
        foundTile = tile;
      }
    }

    this.boardmap.forEach((tile, coordinate) => {
      
    })

    if (foundTile !== null) {
      return foundTile.getPiece();
    } else {
      throw new Error(`${coord.toString()} is not a coordinate on the board.`);
    }
  }

  public cloneBoardForLogic(): Board {
    let logicBoard = new Board(this.height, this.length);

    this.boardmap.forEach((tile, coord) => {
      let localPiece = tile.getPiece();
      if (localPiece !== undefined) {
        logicBoard.get(coord).setPiece(new BoardPiece(localPiece.team, localPiece.type, new Mesh()));
      }
    });

    return logicBoard;
  }

  public getRenderableBoard() {
    return this.renderableBoard;
  }

  private static getTileColor(row: number, col: number) {
    if ((row + col) % 2 === 0) {
      return new Color(Team.Black);
    } else {
      return new Color(Team.White);
    }
  }
}

export default Board;
