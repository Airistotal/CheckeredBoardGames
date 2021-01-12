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
import { ChessMovementJudgeClient } from '../ChessMovementJudgeClient';
import { Utilities } from '../../Utilities';

import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessMovementJudge extends ChessMovementJudgeClient implements MovementJudge {
  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) movementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    super(movementJudgeFactory);
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

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined) return possibleMoves;

    let mvJudge = this.getMovementJudge(Utilities.getMovementJudgeTypeFor(originPiece.type));

    return mvJudge.getPossibleMoves(movementData);
  }

  private destinationHasNoPieceOrHasOpponent(movementData: MovementData) {
      let originPiece = movementData.board.get(movementData.origin);
      if (originPiece === undefined) return false;

      let destinationPiece = movementData.board.get(movementData.destination);
      return destinationPiece === undefined ||
             originPiece.team !== destinationPiece.team;
  }
}