import { MovementJudge } from '../../MovementJudge';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class BishopMovementJudge implements MovementJudge {
  public isLegalMove(movementData: MovementData): boolean {
    let possibleMoves = this.getPossibleMoves(movementData);

    return possibleMoves.includes(movementData.destination);
  }

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();

    possibleMoves = possibleMoves.concat(this.getCoords(movementData, (col) => col + 1, (row) => row + 1));
    possibleMoves = possibleMoves.concat(this.getCoords(movementData, (col) => col + 1, (row) => row - 1));
    possibleMoves = possibleMoves.concat(this.getCoords(movementData, (col) => col - 1, (row) =>row + 1));
    possibleMoves = possibleMoves.concat(this.getCoords(movementData, (col) => col - 1, (row) =>row - 1));

    return possibleMoves;
  }

  private getCoords(movementData: MovementData, incrementCol: (col: number) => number, incrementRow: (row: number) => number): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined) return possibleMoves;

    var currCol = incrementCol(movementData.origin.col);
    var currRow = incrementRow(movementData.origin.row);

    while (currCol < 9 && currRow < 9 && currCol > 0 && currRow > 0) {
      let testCoord = BoardCoordinate.at(currCol, currRow);

      let destinationPiece = movementData.board.get(testCoord)
      if (destinationPiece !== undefined) {
        if (destinationPiece.team !== originPiece.team) {
          possibleMoves.push(testCoord);
        }

        break;
      }

      possibleMoves.push(testCoord);

      currCol = incrementCol(currCol);
      currRow = incrementRow(currRow);
    }

    return possibleMoves;
  }
}