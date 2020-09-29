import GamePiece from './GamePiece';

class BoardTile {
  private piece?: GamePiece;

  constructor(piece?: GamePiece) {
    this.piece = piece;
  }

  public GetPiece() {
    return this.piece;
  }

  public SetPiece(piece?: GamePiece) {
    this.piece = piece;
  }
}

export default BoardTile;
