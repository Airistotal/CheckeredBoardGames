import BoardPiece from './BoardPiece';
import { Color } from 'three';

class BoardTile {
  private piece?: BoardPiece;
  private color: Color;

  constructor(color: Color, piece?: BoardPiece) {
    this.piece = piece;
    this.color = color;
  }

  public GetPiece(): BoardPiece | undefined {
    return this.piece;
  }

  public SetPiece(piece?: BoardPiece): void {
    this.piece = piece;
  }

  public GetColor(): Color {
    return this.color;
  }
}

export default BoardTile;
