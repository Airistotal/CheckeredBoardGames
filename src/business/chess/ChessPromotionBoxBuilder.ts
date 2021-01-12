import { GameType } from '../../models/enums/GameType';
import { PromotionBoxes } from '../../models/PromotionBoxes';
import { BoardPieceBuilder } from '../BoardPieceBuilder';
import { PromotionBoxBuilder } from '../PromotionBoxBuilder';
import { Team } from '../../models/enums/Team';
import { BoardPieceType } from '../../models/enums/BoardPieceType';

import { Group } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessPromotionBoxBuilder implements PromotionBoxBuilder {
  private chessPieceBuilder: BoardPieceBuilder;
  private whitePromotionBoxes: PromotionBoxes = new PromotionBoxes();
  private blackPromotionBoxes: PromotionBoxes = new PromotionBoxes();

  public constructor(@inject(IOCTypes.BoardPieceBuilderFactory) boardPieceBuilderFactory: (type: GameType) => BoardPieceBuilder) {
    this.chessPieceBuilder = boardPieceBuilderFactory(GameType.Chess);
  }

  public async loadPromotionBoxes(): Promise<boolean> {
    await this.addPiecesToWhitePromotionBox();
    await this.addPiecesToBlackPromotionBox();

    return true;
  }

  private async addPiecesToWhitePromotionBox(): Promise<void> {
    let whiteQueen = await this.chessPieceBuilder.createBoardPiece(Team.White, BoardPieceType.Queen);
    this.whitePromotionBoxes.addPromotionBox(whiteQueen.getRenderablePiece(), BoardPieceType.Queen);

    let whiteBishop = await this.chessPieceBuilder.createBoardPiece(Team.White, BoardPieceType.Bishop);
    this.whitePromotionBoxes.addPromotionBox(whiteBishop.getRenderablePiece(), BoardPieceType.Bishop);

    let whiteKnight = await this.chessPieceBuilder.createBoardPiece(Team.White, BoardPieceType.Knight);
    this.whitePromotionBoxes.addPromotionBox(whiteKnight.getRenderablePiece(), BoardPieceType.Knight);

    let whiteRook = await this.chessPieceBuilder.createBoardPiece(Team.White, BoardPieceType.Rook);
    this.whitePromotionBoxes.addPromotionBox(whiteRook.getRenderablePiece(), BoardPieceType.Rook);
  }

  private async addPiecesToBlackPromotionBox(): Promise<void> {
    let blackQueen = await this.chessPieceBuilder.createBoardPiece(Team.Black, BoardPieceType.Queen);
    this.blackPromotionBoxes.addPromotionBox(blackQueen.getRenderablePiece(), BoardPieceType.Queen);

    let blackBishop = await this.chessPieceBuilder.createBoardPiece(Team.Black, BoardPieceType.Bishop);
    this.blackPromotionBoxes.addPromotionBox(blackBishop.getRenderablePiece(), BoardPieceType.Bishop);

    let blackKnight = await this.chessPieceBuilder.createBoardPiece(Team.Black, BoardPieceType.Knight);
    this.blackPromotionBoxes.addPromotionBox(blackKnight.getRenderablePiece(), BoardPieceType.Knight);

    let blackRook = await this.chessPieceBuilder.createBoardPiece(Team.Black, BoardPieceType.Rook);
    this.blackPromotionBoxes.addPromotionBox(blackRook.getRenderablePiece(), BoardPieceType.Rook);
  }

  public getPromotionBoxes(team: Team): Group {
    return team === Team.White 
      ? this.whitePromotionBoxes.getPromotionBoxes()
      : this.blackPromotionBoxes.getPromotionBoxes();
  }
}