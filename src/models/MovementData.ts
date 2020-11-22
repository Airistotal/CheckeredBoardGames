import { FluentMovementDataBuilder } from '../business/FluentMovementDataBuilder';
import { BoardCoordinate } from './BoardCoordinate';
import { Board } from './Board';

export class MovementData {
  public origin: BoardCoordinate = BoardCoordinate.at(0, 0);
  public destination: BoardCoordinate = BoardCoordinate.at(0, 0);
  public board: Board = new Board(0, 0);
  public movedPieces: Array<string> = new Array<string>();
  public defendingKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public attackingPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  constructor(builder: FluentMovementDataBuilder) {
  	this.origin = builder.origin;
  	this.destination = builder.destination;
  	this.board = builder.board;
  	this.movedPieces = builder.movedPieces;
  	this.defendingKing = builder.defendingKing;
  	this.attackingPieces = builder.attackingPieces;
  }
}