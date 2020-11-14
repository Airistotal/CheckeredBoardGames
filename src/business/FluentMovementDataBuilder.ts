import { MovementDataBuilder } from './MovementDataBuilder';
import { MovementData } from '../models/MovementData';
import { BoardCoordinate } from '../models/BoardCoordinate';
import { Board } from '../models/Board';

import { IOCTypes } from './initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class FluentMovementDataBuilder implements MovementDataBuilder {
  public origin: BoardCoordinate = BoardCoordinate.at(0, 0);
  public destination: BoardCoordinate = BoardCoordinate.at(0, 0);
  public board: Board = new Board(0, 0);
  public movedPieces: Array<string> = new Array<string>();
  public whiteKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public whitePieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public blackKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public blackPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  public static MovementData(): FluentMovementDataBuilder {
      return new FluentMovementDataBuilder();
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

  public withWhiteKingOn(coord: BoardCoordinate): FluentMovementDataBuilder {
    this.whiteKing = coord;
    return this;
  }

  public withWhitePiecesOn(coords: Array<BoardCoordinate>): FluentMovementDataBuilder {
    this.whitePieces = coords;
    return this;
  }

  public withBlackKingOn(coord: BoardCoordinate): FluentMovementDataBuilder {
    this.blackKing = coord;
    return this;
  }

  public withBlackPiecesOn(coords: Array<BoardCoordinate>): FluentMovementDataBuilder {
    this.blackPieces = coords;
    return this;
  }

  // client doesn't get to instantiate Customer directly
  public build(): MovementData {
      return new MovementData(this);            
  }
}