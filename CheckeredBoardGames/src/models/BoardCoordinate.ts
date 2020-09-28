class BoardCoordinate {
  private col: string;
  private row: number;

  constructor(col: string, row: number) {
    this.col = col;
    this.row = row;
  }

  static at(col: string, row: number) {
    return new BoardCoordinate(col, row);
  }

  public toString() {
    return this.col + this.row;
  }

  public Equals(other: BoardCoordinate) {
    if (other === null) { return false; }

    return this.col === other.col &&
           this.row === other.row;
  }

  IsInCol(col: string) {
    return this.col === col;
  }

  IsInRow(row: number) {
    return this.row === row;
  }
}

export default BoardCoordinate;