import { MovementJudge } from '../../MovementJudge';
import { Utilities } from '../../Utilities';
import { ChessMovementJudgeClient } from '../ChessMovementJudgeClient';
import { BoardCoordinate } from '../../../models/BoardCoordinate';
import { Board } from '../../../models/Board';
import { MovementData } from '../../../models/MovementData';
import { BoardPieceType } from '../../../models/enums/BoardPieceType';
import { GameType } from '../../../models/enums/GameType';
import { MovementJudgeType } from '../../../models/enums/MovementJudgeType';
import { FluentMovementDataBuilder } from '../../FluentMovementDataBuilder';

import { Vector2 } from 'three';

import { IOCTypes } from '../../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class KingMovementJudge extends ChessMovementJudgeClient implements MovementJudge {
  constructor(@inject(IOCTypes.AbstractPieceMovementJudgeFactory) movementJudgeFactory: (type: GameType) => (type: MovementJudgeType) => MovementJudge) {
    super(movementJudgeFactory);
  }

  public static isCaslting(movementData: MovementData): boolean {
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined || originPiece.type !== BoardPieceType.King) return false;

    let movementVector = BoardCoordinate.getVector(movementData.origin, movementData.destination);
    return (movementVector.x === 2 || movementVector.x === -2) && movementVector.y === 0;
  }

  public static getCasltingRookOrigin(movementData: MovementData): BoardCoordinate {
    let origin = movementData.origin;
    let moveVector = BoardCoordinate.getVector(origin, movementData.destination);

    return moveVector.x < 0 ?
           BoardCoordinate.at(origin.col - 4, origin.row) :
           BoardCoordinate.at(origin.col + 3, origin.row)
  }

  public static getCasltingRookDestination(movementData: MovementData): BoardCoordinate {
    let origin = movementData.origin;
    let moveVector = BoardCoordinate.getVector(origin, movementData.destination);

    return moveVector.x < 0 ?
           BoardCoordinate.at(origin.col - 1, origin.row) :
           BoardCoordinate.at(origin.col + 1, origin.row)
  }

  public isLegalMove(movementData: MovementData): boolean {
    return this.getPossibleMoves(movementData).includes(movementData.destination);
  }

  public getPossibleMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    
    possibleMoves = possibleMoves.concat(this.getAllMovesAroundKing(movementData));
    possibleMoves = possibleMoves.concat(this.getCastlingMoves(movementData));

    return possibleMoves;
  }

  private getAllMovesAroundKing(movementData: MovementData) {
    let possibleMoves = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin);
    if (originPiece === undefined || originPiece.type !== BoardPieceType.King) return possibleMoves;

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        let moveVector = new Vector2(i, j);
        let destination = movementData.origin.addVector(moveVector);

        if (destination.col < 1 || destination.col > 8 || 
            destination.row < 1 || destination.row > 8) continue;

        let destinationPiece = movementData.board.get(destination);
        if (destinationPiece !== undefined) {
          if (destinationPiece.team !== originPiece.team) {
            possibleMoves.push(destination);
          }
        } else {
          possibleMoves.push(destination);
        }
      }
    }

    return possibleMoves;
  }

  private getCastlingMoves(movementData: MovementData): Array<BoardCoordinate> {
    let possibleMoves = new Array<BoardCoordinate>();
    let originPiece = movementData.board.get(movementData.origin)
    if (originPiece === undefined || 
        originPiece.type !== BoardPieceType.King ||
        movementData.movedPieces.includes(originPiece.id) ||
        movementData.origin.col !== 5)
    {
      return possibleMoves;
    }

    if (this.arePiecesInPlaceForKingsideCastle(movementData) &&
        this.doesNotMoveThroughCheckKingside(movementData)) {
      possibleMoves.push(movementData.origin.addVector(new Vector2(2,  0)));
    }

    if (this.arePiecesInPlaceForQueensideCastle(movementData) &&
        this.doesNotMoveThroughCheckQueenside(movementData)) {
      possibleMoves.push(movementData.origin.addVector(new Vector2(-2,  0)));
    }

    return possibleMoves;
  }

  private arePiecesInPlaceForQueensideCastle(movementData: MovementData): boolean {
    let board = movementData.board;
    let origin = movementData.origin;
    let king = movementData.board.get(movementData.origin);
    let rook = board.get(BoardCoordinate.at(origin.col - 4, origin.row));

    return board.get(BoardCoordinate.at(origin.col - 1, origin.row)) === undefined &&
           board.get(BoardCoordinate.at(origin.col - 2, origin.row)) === undefined &&
           board.get(BoardCoordinate.at(origin.col - 3, origin.row)) === undefined &&
           rook !== undefined &&
           rook.type === BoardPieceType.Rook &&
           king !== undefined &&
           rook.team === king.team &&
           !movementData.movedPieces.some((v) => rook !== undefined && v === rook.id);
  }

  private doesNotMoveThroughCheckQueenside(movementData: MovementData): boolean {
    let origin = movementData.origin;
    let attack_1 = this.enemyAttacksDestination(movementData, BoardCoordinate.at(origin.col - 1, origin.row));
    let attack_2 = this.enemyAttacksDestination(movementData, BoardCoordinate.at(origin.col - 2, origin.row));
    let attack_3 = this.enemyAttacksDestination(movementData, BoardCoordinate.at(origin.col - 3, origin.row));

    return !attack_1 && !attack_2 && !attack_3;
  }

  private arePiecesInPlaceForKingsideCastle(movementData: MovementData): boolean {
    let board = movementData.board;
    let origin = movementData.origin;
    let king = movementData.board.get(movementData.origin);
    let rook = board.get(BoardCoordinate.at(origin.col + 3, origin.row));

    return board.get(BoardCoordinate.at(origin.col + 1, origin.row)) === undefined &&
           board.get(BoardCoordinate.at(origin.col + 2, origin.row)) === undefined &&
           rook !== undefined && 
           rook.type === BoardPieceType.Rook &&
           king !== undefined &&
           rook.team === king.team &&
           !movementData.movedPieces.some((v) => rook !== undefined && v === rook.id);
  }

  private doesNotMoveThroughCheckKingside(movementData: MovementData): boolean {
    let origin = movementData.origin;
    let attack_1 = this.enemyAttacksDestination(movementData, BoardCoordinate.at(origin.col + 1, origin.row));
    let attack_2 = this.enemyAttacksDestination(movementData, BoardCoordinate.at(origin.col + 2, origin.row));

    return !attack_1 && !attack_2;
  }

  private enemyAttacksDestination(movementData: MovementData, destination: BoardCoordinate): boolean {
    var attacksDestination = false;

    movementData.enemyPieces.forEach((coord, index) => {
      let originPiece = movementData.board.get(coord);
      if (originPiece !== undefined) {
        if (originPiece.type === BoardPieceType.King) {
          let newMovementData = FluentMovementDataBuilder.MovementData()
            .shallowClone(movementData)
            .from(coord)
            .build();

          let opponentKingMoves = this.getAllMovesAroundKing(newMovementData);

          if (opponentKingMoves.includes(movementData.destination)) {
            attacksDestination = true;
          }
        } else {
          let movementJudge = this.getMovementJudge(Utilities.getMovementJudgeTypeFor(originPiece.type));
          let attackMoveData = FluentMovementDataBuilder
            .MovementData()
            .shallowClone(movementData)
            .from(coord)
            .to(destination)
            .build();

          if (movementJudge.isLegalMove(attackMoveData)) {
            attacksDestination = true;
          }
        }
      }
    });

    return attacksDestination;
  }
}