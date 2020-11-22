import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardPiece } from '../../../models/BoardPiece';
import { Board } from '../../../models/Board';
import { GameType } from '../../../models/enums/GameType';
import { Team } from '../../../models/enums/Team';
import { MovementData } from '../../../models/MovementData';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { MovementJudgeType } from '../../../models/enums/MovementJudgeType';
import { FluentMovementDataBuilder } from '../../FluentMovementDataBuilder';
import { Utilities } from '../../Utilities';

import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessMovementJudge implements MovementJudge {
  private readonly movementJudgeFactory: (type: MovementJudgeType) => MovementJudge;
  private readonly movementJudges: Map<MovementJudgeType, MovementJudge>;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) movementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    this.movementJudgeFactory = movementJudgeFactory(GameType.Chess);
    this.movementJudges = new Map<MovementJudgeType, MovementJudge>();
  }

  public isLegalMove(movementData: MovementData) : boolean {
    try {
      let originPiece = movementData.board.get(movementData.origin);
      if (originPiece === undefined) return false;

      let movementJudge = this.getMovementJudge(Utilities.getMovementJudgeTypeFor(originPiece.type));
      let checkJudge = this.getMovementJudge(MovementJudgeType.Check);

      return movementJudge.isLegalMove(movementData) &&
             checkJudge.isLegalMove(movementData) &&
             this.destinationHasNoPieceOrHasOpponent(movementData);
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  private getMovementJudge(type: MovementJudgeType) {
    let movementJudge = this.movementJudges.get(type);
    if (movementJudge === undefined) {
      movementJudge = this.movementJudgeFactory(type);
      this.movementJudges.set(type, movementJudge);
    }

    return movementJudge;
  }

  private destinationHasNoPieceOrHasOpponent(movementData: MovementData) {
      let originPiece = movementData.board.get(movementData.origin);
      if (originPiece === undefined) return false;

      let destinationPiece = movementData.board.get(movementData.destination);
      return destinationPiece === undefined ||
             originPiece.team !== destinationPiece.team;
  }
}