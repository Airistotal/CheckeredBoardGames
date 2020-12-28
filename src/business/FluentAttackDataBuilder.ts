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
  public allyPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public enemyPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

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

  public withAllyPiecesOn(coords: Array<BoardCoordinate>): FluentAttackDataBuilder {
    this.allyPieces = coords;
    return this;
  }

  public withEnemyPiecesOn(coords: Array<BoardCoordinate>): FluentAttackDataBuilder {
    this.enemyPieces = coords;
    return this;
  }

  // client doesn't get to instantiate Customer directly
  public build(): AttackData {
      return new AttackData(this);            
  }
}