import { Vector2 } from 'three';

class BoardCoordinate {
  private col: number;
  private row: number;

  constructor(col: number, row: number) {
    BoardCoordinate.validate(col, row);

    this.col = col;
    this.row = row;
  }

  private static instances: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  public static at(col: number, row: number) {
    return new BoardCoordinate(col, row);
  }

  public static getVector(origin: BoardCoordinate, destination: BoardCoordinate): Vector2 {
    let x = destination.col - origin.col;
    let y = destination.row - origin.row;

    return new Vector2(x, y);
  }

  public clone(): BoardCoordinate {
    return BoardCoordinate.at(this.col, this.row);
  }

  public getCol() {
    return this.col;
  }

  public getRow() {
    return this.row;
  }

  public addVector(v: Vector2) {
    this.col += v.x;
    this.row += v.y;
  }

  public toString() {
    return "(" + this.col + ", " + this.row + ")";
  }

  public Equals(other: BoardCoordinate) {
    if (other === null) { return false; }

    return this.col === other.col &&
           this.row === other.row;
  }

  public IsInCol(col: number) {
    return this.col === col;
  }

  public IsInRow(row: number) {
    return this.row === row;
  }

  private static validate(col: number, row: number) {
    let errorMsg = 'Invalid ';
    let throwErr = false;

    if(col < 0) {
      throwErr = true;
      errorMsg += 'column <' + col + '>';

      if(row < 0) {
        errorMsg += ' and ';
      }
    }

    if(row < 0) {
      throwErr = true;

      errorMsg += 'row <' + row + '>';
    }

    if (throwErr) {
      throw new Error(errorMsg);
    }
  }
}

export default BoardCoordinate;
