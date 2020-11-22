import { MovementDataBuilder } from './MovementDataBuilder';
import { MovementData } from '../models/MovementData';
import { BoardCoordinate } from '../models/BoardCoordinate';
import { Board } from '../models/Board';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class FluentMovementDataBuilder {
  public origin: BoardCoordinate = BoardCoordinate.at(0, 0);
  public destination: BoardCoordinate = BoardCoordinate.at(0, 0);
  public board: Board = new Board(0, 0);
  public movedPieces: Array<string> = new Array<string>();
  public defendingKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public attackingPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  public static MovementData(): FluentMovementDataBuilder {
      return new FluentMovementDataBuilder();
  }

  public shallowClone(orig: MovementData): FluentMovementDataBuilder {
    this.origin = orig.origin;
    this.destination = orig.destination;
    this.board = orig.board;
    this.movedPieces = orig.movedPieces;
    this.defendingKing = orig.defendingKing;
    this.attackingPieces = orig.attackingPieces;
    return this;
  }

  public from(origin: BoardCoordinate): FluentMovementDataBuilder {
      this.origin = origin;
      return this;
  }

  public to(destination: BoardCoordinate): FluentMovementDataBuilder {
      this.destination = destination;
      return this;
  }

  public on(board: Board): FluentMovementDataBuilder {
    this.board = board;
    return this;
  }

  public withMovedPieces(movedPieces: Array<string>): FluentMovementDataBuilder {
    this.movedPieces = movedPieces;
    return this;
  }

  public withDefendingKingOn(coord: BoardCoordinate): FluentMovementDataBuilder {
    this.defendingKing = coord;
    return this;
  }

  public withAttackingPiecesOn(coords: Array<BoardCoordinate>): FluentMovementDataBuilder {
    this.attackingPieces = coords;
    return this;
  }

  // client doesn't get to instantiate Customer directly
  public build(): MovementData {
      return new MovementData(this);            
  }
}