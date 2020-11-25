import { AttackData } from '../models/AttackData';
import { BoardCoordinate } from '../models/BoardCoordinate';
import { Board } from '../models/Board';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class FluentAttackDataBuilder {
  public board: Board = new Board(0, 0);
  public defendingKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public defendingPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public attackingPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  public static AttackData(): FluentAttackDataBuilder {
      return new FluentAttackDataBuilder();
  }

  public on(board: Board): FluentAttackDataBuilder {
    this.board = board;
    return this;
  }

  public withDefendingKingOn(coord: BoardCoordinate): FluentAttackDataBuilder {
    this.defendingKing = coord;
    return this;
  }

  public withDefendingPiecesOn(coords: Array<BoardCoordinate>): FluentAttackDataBuilder {
    this.defendingPieces = coords;
    return this;
  }

  public withAttackingPiecesOn(coords: Array<BoardCoordinate>): FluentAttackDataBuilder {
    this.attackingPieces = coords;
    return this;
  }

  // client doesn't get to instantiate Customer directly
  public build(): AttackData {
      return new AttackData(this);            
  }
}