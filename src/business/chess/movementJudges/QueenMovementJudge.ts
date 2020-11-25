import { MovementJudge } from '../../MovementJudge';
import { BishopMovementJudge } from '../../chess/movementJudges/BishopMovementJudge';
import { RookMovementJudge } from '../../chess/movementJudges/RookMovementJudge';
import { MovementData } from '../../../models/MovementData';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class QueenMovementJudge implements MovementJudge {
  private readonly bishopMovementJudge: BishopMovementJudge;
  private readonly rookMovementJudge: RookMovementJudge;

  constructor() {
    this.bishopMovementJudge = new BishopMovementJudge();
    this.rookMovementJudge = new RookMovementJudge();
  }

  public isLegalMove(movementData: MovementData): boolean {
    return this.rookMovementJudge.isLegalMove(movementData) ||
           this.bishopMovementJudge.isLegalMove(movementData);
  }
}