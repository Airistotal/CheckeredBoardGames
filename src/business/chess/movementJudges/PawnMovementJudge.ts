import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { BoardPiece } from '../../../models/BoardPiece';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { Team } from '../../../models/enums/Team';
import { BoardTile } from '../../../models/BoardTile';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class PawnMovementJudge implements MovementJudge {
  private static PawnMove = new Vector2(0, 1);
  private static PawnInitialMove = new Vector2(0, 2);
  private static PawnAttack = new Vector2(1, 1);

  public static pawnIsPromoting(coord: BoardCoordinate, piece: BoardPiece): boolean
  {
    if (piece.type !== BoardPieceType.Pawn) return false;

    let direction = this.getDirectionForTeam(piece.team);
    let row = coord.row;

    if (direction === 1) {
      return row === 8;
    } else if (direction === -1) {
      return row === 1;
    } else {
      return false;
    }
  }

  public static isMoveTwoForward(movementData: MovementData): boolean {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined) return false;

    let direction = PawnMovementJudge.getDirectionForTeam(originPiece.team);
    let twoForwardVector = new Vector2(0, 2 * direction);

    return originPiece.type === BoardPieceType.Pawn &&
           mvVector.equals(twoForwardVector);
  }

  public static isEnPassantAttack(movementData: MovementData, ghostId: string): boolean {
    let originPiece = movementData.board.get(movementData.origin);
    let attackedPiece = movementData.board.get(movementData.destination);

    return attackedPiece !== undefined && attackedPiece.id === ghostId &&
           originPiece !== undefined && originPiece.type === BoardPieceType.Pawn;
  }

  public static getEnPassantCoordinate(movementData: MovementData): BoardCoordinate {
    let mvVector = BoardCoordinate.getVector(movementData.origin, movementData.destination)
    mvVector.y = 0;

    let enPassantCoordinate = movementData.origin;
    enPassantCoordinate.addVector(mvVector);

    return enPassantCoordinate;
  }

  public static getEnPassantGhostCoordinate(movementData: MovementData): BoardCoordinate {
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined) throw new Error('Unable to get en passant ghost coordinate for empty origin piece');

    let mvVector = new Vector2(0, 1 * this.getDirectionForTeam(originPiece.team));

    return movementData.origin.addVector(mvVector);
  }

  public isLegalMove(movementData: MovementData) : boolean {
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined) return false;

    let possibleMoves = this.getPossibleMoves(movementData);

    return possibleMoves.includes(movementData.destination);
  }

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let coords = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin);

    if(originPiece != undefined && originPiece.type === BoardPieceType.Pawn) {
      let direction = PawnMovementJudge.getDirectionForTeam(originPiece.team);
      let origin = movementData.origin;

      let oneInFront = BoardCoordinate.at(origin.col, origin.row + direction);
      if (this.isValidMove(oneInFront, movementData)) {
        coords.push(oneInFront);

        let twoInFront = BoardCoordinate.at(origin.col, origin.row + (2*direction));
        if (!movementData.movedPieces.some((v) => originPiece !== undefined && v === originPiece.id) &&
            this.isValidMove(twoInFront, movementData)) {
          coords.push(twoInFront);
        }
      }

      var leftAttackDest = BoardCoordinate.at(origin.col - 1, origin.row + direction);
      if (this.isValidAttack(leftAttackDest, movementData)) {
        coords.push(leftAttackDest);
      }

      var rightAttackDest = BoardCoordinate.at(origin.col + 1, origin.row + direction);
      if (this.isValidAttack(rightAttackDest, movementData)) {
        coords.push(rightAttackDest);
      }
    }

    return coords;
  }

  private isValidMove(dest: BoardCoordinate, mvDta: MovementData): boolean {
    if (dest.col > 0 && dest.col < 9 && dest.row > 0 && dest.row < 9) {
      let originPiece = mvDta.board.get(mvDta.origin);
      let destPiece = mvDta.board.get(dest);

      if (destPiece === undefined && originPiece !== undefined) {
        return true;
      }
    }

    return false;
  }

  private isValidAttack(dest: BoardCoordinate, mvDta: MovementData): boolean {
    if (dest.col > 0 && dest.col < 9 && dest.row > 0 && dest.row < 9) {
      let originPiece = mvDta.board.get(mvDta.origin);
      let destPiece = mvDta.board.get(dest);

      if (destPiece !== undefined && originPiece !== undefined &&
          destPiece.team !== originPiece.team) {
        return true;
      }
    }

    return false;
  }

  private static getDirectionForTeam(team: Team): number {
    if (team === Team.White) {
      return 1;
    }
    else if (team === Team.Black) {
      return -1;
    }
    else {
      return 0;
    }
  }
}