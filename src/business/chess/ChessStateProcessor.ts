import { GameStateProcessor } from '../GameStateProcessor';
import { MovementJudge } from '../MovementJudge';
import { Board } from '../../models/Board';
import { AttackData } from '../../models/AttackData';
import { BoardCoordinate } from '../../models/BoardCoordinate';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { MovementJudgeType } from '../../models/enums/MovementJudgeType';
import { GameType } from '../../models/enums/GameType';
import { MovementData } from '../../models/MovementData';
import { Team } from '../../models/enums/Team';
import { FluentMovementDataBuilder } from '../FluentMovementDataBuilder';
import { Utilities } from '../Utilities';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessStateProcessor implements GameStateProcessor {
  private readonly pieceMovementJudgeFactory: (type: MovementJudgeType) => MovementJudge;
  private readonly pieceMovementJudges: Map<MovementJudgeType, MovementJudge>;

  private playingTeam = Team.White;

  private logicBoard: Board = new Board(0, 0);
  private attackCoords = new Array<BoardCoordinate>();
  private opponentPieceCoords = new Array<BoardCoordinate>();
  private defendingPieceCoords = new Array<BoardCoordinate>();
  private defendingKingCoord: BoardCoordinate|undefined;

  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) abstractPieceMovementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    this.pieceMovementJudgeFactory = abstractPieceMovementJudgeFactory(GameType.Chess);
    this.pieceMovementJudges = new Map<MovementJudgeType, MovementJudge>();
  }

  public isGameOver(attackData: AttackData): boolean {
    this.logicBoard = attackData.board.cloneBoardForLogic();
    let directAttackingPieces = this.getDirectAttackingPieces(attackData);

    if (directAttackingPieces.length > 1) {
      return this.canKingMoveOutOfCheck(attackData);
    } else if (directAttackingPieces.length === 1) {
      return this.canKingMoveOutOfCheck(attackData) || this.canAnyPieceInterfereInAttack();
    } else {
      return false;
    }
  }

  private getDirectAttackingPieces(attackData: AttackData): BoardCoordinate[] {
    let directAttackingPieces = new Array<BoardCoordinate>();

    let self = this;
    attackData.attackingPieces.forEach((coord) => {
      let attackingPiece = attackData.board.get(coord);
      if (attackingPiece !== undefined) {
        let mvJudge = self.getMovementJudge(attackingPiece.type);
        let mvDta = FluentMovementDataBuilder.MovementData()
          .on(attackData.board)
          .from(coord)
          .to(attackData.defendingKing);

        if (mvJudge.isLegalMove(mvDta)) {
          directAttackingPieces.push(coord);
        }
      }
    });

    return directAttackingPieces;
  }

  private canAnyPieceInterfereInAttack(): boolean {
    return true;
  }

  private canKingMoveOutOfCheck(attackData: AttackData): boolean {
    let chkJudge = this.getMovementJudgeByType(MovementJudgeType.Check);

    let kingCanMove = false;
    

    return kingCanMove;
  }

  private getMovementJudge(pieceType: BoardPieceType) {
    let movementJudgeType = Utilities.getMovementJudgeTypeFor(pieceType);
    return this.getMovementJudgeByType(movementJudgeType);
  }

  private getMovementJudgeByType(movementJudgeType: MovementJudgeType) {
    let movementJudge = this.pieceMovementJudges.get(movementJudgeType);
    if (movementJudge === undefined) {
      movementJudge = this.pieceMovementJudgeFactory(movementJudgeType);
      this.pieceMovementJudges.set(movementJudgeType, movementJudge);
    }

    return movementJudge;
  }
}