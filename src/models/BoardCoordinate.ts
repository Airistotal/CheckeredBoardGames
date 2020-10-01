import { Vector2 } from 'three';

class BoardCoordinate {
  public readonly col: number;
  public readonly row: number;

  constructor(col: number, row: number) {
    BoardCoordinate.validate(col, row);

    this.col = col;
    this.row = row;
  }

  public static at(col: number, row: number) {
    return new BoardCoordinate(col, row);
  }

  public static getVector(origin: BoardCoordinate, destination: BoardCoordinate): Vector2 {
    let x = destination.col - origin.col;
    let y = destination.row - origin.row;

    return new Vector2(x, y);
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

    if(col < 1) {
      throwErr = true;
      errorMsg += 'column <' + col + '>';

      if(row < 1) {
        errorMsg += ' and ';
      }
    }

    if(row < 1) {
      throwErr = true;

      errorMsg += 'row <' + row + '>';
    }

    if (throwErr) {
      throw new Error(errorMsg);
    }
  }
}

export default BoardCoordinate;
