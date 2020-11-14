import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardPiece } from '../../../models/BoardPiece';
import { Board } from '../../../models/Board';
import { GameType } from '../../../models/enums/GameType';
import { MovementData } from '../../../models/MovementData';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class CheckMovementJudge implements MovementJudge {
  private readonly pieceMovementJudgeFactory: (type: BoardPieceType) => MovementJudge;
  private readonly pieceMovementJudges: Map<BoardPieceType, MovementJudge>;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) abstractPieceMovementJudgeFactory: (type: GameType) => (type: BoardPieceType) => MovementJudge) {
    this.pieceMovementJudgeFactory = abstractPieceMovementJudgeFactory(GameType.Chess);
    this.pieceMovementJudges = new Map<BoardPieceType, MovementJudge>();
  }

  public isLegalMove(movementData: MovementData) : boolean {
    return false;
  }
}