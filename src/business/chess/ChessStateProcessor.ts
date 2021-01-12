import { GameStateProcessor } from '../GameStateProcessor';
import { MovementJudge } from '../MovementJudge';
import { Board } from '../../models/Board';
import { AttackData } from '../../models/AttackData';
import { BoardCoordinate } from '../../models/BoardCoordinate';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { MovementJudgeType } from '../../models/enums/MovementJudgeType';
import { GameType } from '../../models/enums/GameType';
import { GameState } from '../../models/enums/GameState';
import { MovementData } from '../../models/MovementData';
import { Team } from '../../models/enums/Team';
import { FluentMovementDataBuilder } from '../FluentMovementDataBuilder';
import { ChessMovementJudgeClient } from './ChessMovementJudgeClient';
import { Utilities } from '../Utilities';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessStateProcessor extends ChessMovementJudgeClient implements GameStateProcessor {
  private playingTeam = Team.White;

  private logicBoard: Board = new Board(0, 0);
  private attackCoords = new Array<BoardCoordinate>();
  private opponentPieceCoords = new Array<BoardCoordinate>();
  private defendingPieceCoords = new Array<BoardCoordinate>();
  private defendingKingCoord: BoardCoordinate|undefined;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) movementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    super(movementJudgeFactory);
  }

  public isGameOver(attackData: AttackData): boolean {
    let checkMovementJudge = this.getMovementJudge(MovementJudgeType.Check);
    let mvDta = FluentMovementDataBuilder.MovementData()
      .on(attackData.board)
      .withAllyPiecesOn(attackData.allyPieces)
      .withEnemyPiecesOn(attackData.enemyPieces)
      .withDefendingKingOn(attackData.defendingKing)
      .build();

    let possibleMoves = checkMovementJudge.getPossibleMoves(mvDta);

    if (possibleMoves.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}