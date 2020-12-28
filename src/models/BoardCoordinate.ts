import { Vector2 } from 'three';

export class BoardCoordinate {
  public readonly col: number;
  public readonly row: number;

  private constructor(col: number, row: number) {
    this.col = col;
    this.row = row;
  }

  private static instances = new Map<number, Map<number, BoardCoordinate>>();

  public static at(col: number, row: number) {
    let coordCols = BoardCoordinate.instances.get(col);
    if (!coordCols) {
      coordCols = new Map<number, BoardCoordinate>();
      BoardCoordinate.instances.set(col, coordCols);
    }

    let coord = coordCols.get(row);
    if (!coord) {
      coord = new BoardCoordinate(col, row)
      coordCols.set(row, coord);
    }

    return coord;
  }

  public static getVector(origin: BoardCoordinate, destination: BoardCoordinate): Vector2 {
    let x = destination.col - origin.col;
    let y = destination.row - origin.row;

    return new Vector2(x, y);
  }

  public addVector(v: Vector2): BoardCoordinate {
    return BoardCoordinate.at(this.col + v.x, this.row + v.y);
  }

  public toString() {
    return "(" + this.col + ", " + this.row + ")";
  }

  public Equals(other: BoardCoordinate) {
    if (other === null) { return false; }

    return this.col === other.col &&
           this.row === other.row;
  }
}