import { BoardPieceType } from './enums/BoardPieceType';

export class SelectedPromotion {
  public selectedPieceType: BoardPieceType;

  constructor(pieceType: BoardPieceType) {
    this.selectedPieceType = pieceType;
  }
}