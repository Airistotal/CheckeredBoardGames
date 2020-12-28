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

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let attackingPieces = this.getAttackingPieces(movementData, movementData.defendingKing);
    let possibleMoves = new Array<BoardCoordinate>();

    if (attackingPieces.length === 1) {
      possibleMoves = possibleMoves.concat(this.getPossibleInterceptions(attackingPieces, movementData));
    } else if (attackingPieces.length === 0) {
      // No attackers, make sure this returns something
      possibleMoves.push(BoardCoordinate.at(0, 0))
    }

    possibleMoves = possibleMoves.concat(this.getPossibleKingMoves(movementData));

    return possibleMoves;
  }

  private getAttackingPieces(movementData: MovementData, destination: BoardCoordinate): Array<BoardCoordinate> {
    let attackingPieces = new Array<BoardCoordinate>();

    let self = this;
    movementData.enemyPieces.forEach((coord, index) => {
      let origPiece = movementData.board.get(coord);
      if (origPiece !== undefined) {
        let movementJudge = self.getMovementJudge(Utilities.getMovementJudgeTypeFor(origPiece.type));
        let mvDta = FluentMovementDataBuilder
          .MovementData()
          .on(movementData.board)
          .from(coord)
          .to(destination)
          .build();

        if (movementJudge.isLegalMove(mvDta)) {
          attackingPieces.push(coord);
        }
      }
    });

    return attackingPieces;
  }

  private getPossibleInterceptions(attackingPieces: Array<BoardCoordinate>, movementData: MovementData): Array<BoardCoordinate> {
    let interceptionCoords = this.getInterceptionCoords(attackingPieces, movementData);
    let possibleInterceptionCoords = new Array<BoardCoordinate>();

    let self = this;
    movementData.allyPieces.forEach((from, index) => {
      let origPiece = movementData.board.get(from);
      if (origPiece !== undefined) {
        let movementJudge = self.getMovementJudge(Utilities.getMovementJudgeTypeFor(origPiece.type));

        interceptionCoords.forEach((to, index) => {
          let mvDta = FluentMovementDataBuilder
            .MovementData()
            .on(movementData.board)
            .from(from)
            .to(to)
            .build();

          if (movementJudge.isLegalMove(movementData) && 
              !this.doOpponentPiecesAttackDefendingKing(mvDta)) {
            possibleInterceptionCoords.push(to);
          }
        });
      }
    });

    return possibleInterceptionCoords;
  }

  private getInterceptionCoords(attackingPieces: Array<BoardCoordinate>, movementData: MovementData): Array<BoardCoordinate> {
    let interceptionCoords = new Array<BoardCoordinate>();

    attackingPieces.forEach((attackerCoord) => {
      let pieceInterceptionCoords = this.getInterceptionCoordsForPiece(attackerCoord, movementData);

      interceptionCoords = interceptionCoords.concat(pieceInterceptionCoords);
    });

    return interceptionCoords;
  }

  private getInterceptionCoordsForPiece(attackerCoord: BoardCoordinate, movementData: MovementData): Array<BoardCoordinate> {
    let attackerPiece = movementData.board.get(attackerCoord);
    let interceptionCoords = new Array<BoardCoordinate>();

    if (attackerPiece !== undefined) {
      let type = attackerPiece.type;

      if (type === BoardPieceType.Bishop ||
          type === BoardPieceType.Rook ||
          type === BoardPieceType.Queen)
      {
        let deltaX = movementData.defendingKing.col - attackerCoord.col;
        let deltaY = movementData.defendingKing.row - attackerCoord.row;

        let movementVector = new Vector2(deltaX/Math.abs(deltaX), deltaY/Math.abs(deltaY));

        let inBetweenSquare = attackerCoord.addVector(movementVector);
        let i = 0;

        while (inBetweenSquare !== movementData.defendingKing && i < 8) {
          interceptionCoords.push(inBetweenSquare);

          inBetweenSquare = inBetweenSquare.addVector(movementVector);
          i++;
        }
      }

      interceptionCoords.push(attackerCoord);
    }

    return interceptionCoords;
  }

  private getPossibleKingMoves(movementData: MovementData): Array<BoardCoordinate> {
    let kingMovementJudge = this.getMovementJudge(Utilities.getMovementJudgeTypeFor(BoardPieceType.King));

    let kingMovementData = FluentMovementDataBuilder.MovementData()
      .shallowClone(movementData)
      .from(movementData.defendingKing)
      .build();

    let possibleKingMoves = kingMovementJudge.getPossibleMoves(kingMovementData);
    let filteredPossibleKingMoves = new Array<BoardCoordinate>();

    possibleKingMoves.forEach((kingDest, index) => {
      let attackers = this.getAttackingPieces(movementData, kingDest);

      if (attackers.length === 0) {
        filteredPossibleKingMoves.push(kingDest);
      }
    });

    return filteredPossibleKingMoves;
  }

  private doOpponentPiecesAttackDefendingKing(movementData: MovementData): boolean {
    let check = false;
    let logicBoard = movementData.board.cloneBoardForLogic();
    this.executeMove(logicBoard, movementData);
    
    let self = this;
    movementData.enemyPieces.forEach((coord, index) => {
      let origPiece = logicBoard.get(coord);
      if (origPiece !== undefined) {
        let movementJudge = self.getMovementJudge(Utilities.getMovementJudgeTypeFor(origPiece.type));
        let mvDta = FluentMovementDataBuilder
          .MovementData()
          .on(logicBoard)
          .from(coord)
          .to(movementData.defendingKing)
          .build();

        check = movementJudge.isLegalMove(mvDta) || check;
      }
    });

    return check;
  }
}