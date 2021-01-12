import { MovementJudge } from '../MovementJudge';
import { MovementJudgeType } from '../../models/enums/MovementJudgeType';
import { GameType } from '../../models/enums/GameType';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessMovementJudgeClient {
  private readonly movementJudgeFactory: (type: MovementJudgeType) => MovementJudge;
  private readonly movementJudges: Map<MovementJudgeType, MovementJudge>;

  constructor(movementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    this.movementJudgeFactory = movementJudgeFactory(GameType.Chess);
    this.movementJudges = new Map<MovementJudgeType, MovementJudge>();
  }

  protected getMovementJudge(type: MovementJudgeType) {
    let movementJudge = this.movementJudges.get(type);
    if (movementJudge === undefined) {
      movementJudge = this.movementJudgeFactory(type);
      this.movementJudges.set(type, movementJudge);
    }

    return movementJudge;
  }
}