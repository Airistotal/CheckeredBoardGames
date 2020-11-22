import { MovementJudge } from '../../MovementJudge';
import { Utilities } from '../../Utilities';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardPiece } from '../../../models/BoardPiece';
import { Board } from '../../../models/Board';
import { GameType } from '../../../models/enums/GameType';
import { MovementData } from '../../../models/MovementData';
import { MovementJudgeType } from '../../../models/enums/MovementJudgeType';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Vector2 } from 'three';
import { FluentMovementDataBuilder } from '../../FluentMovementDataBuilder';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class CheckMovementJudge implements MovementJudge {
  private readonly movementJudgeFactory: (type: MovementJudgeType) => MovementJudge;
  private readonly movementJudges: Map<MovementJudgeType, MovementJudge>;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) movementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    this.movementJudgeFactory = movementJudgeFactory(GameType.Chess);
    this.movementJudges = new Map<MovementJudgeType, MovementJudge>();
  }

  public isLegalMove(movementData: MovementData) : boolean {
    try {
      return !this.doOpponentPiecesAttackDefendingKing(movementData);
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

  private doOpponentPiecesAttackDefendingKing(movementData: MovementData): boolean {
    let check = false;
    let logicBoard = movementData.board.cloneBoardForLogic();
    this.executeMove(logicBoard, movementData);
    
    let self = this;
    movementData.attackingPieces.forEach((coord, index) => {
      let origPiece = logicBoard.get(coord);
      if (origPiece !== undefined) {
        let movementJudge = self.getMovementJudge(Utilities.getMovementJudgeTypeFor(origPiece.type));
        let mvDta = FluentMovementDataBuilder
          .MovementData()
          .on(logicBoard)
          .from(coord)
          .to(movementData.defendingKing)
          .build();

        check = movementJudge.isLegalMove(mvDta);
      }
    });

    return check;
  }

  private executeMove(board: Board, movementData: MovementData) {
    let originPiece = board.get(movementData.origin);
    if (originPiece !== undefined) {  
      if (originPiece.type === BoardPieceType.King) {
        movementData.defendingKing = movementData.destination;
      }

      board.set(movementData.destination, originPiece);
      board.set(movementData.origin, undefined);
    }
  }
}