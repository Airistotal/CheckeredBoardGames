import { FluentMovementDataBuilder } from '../business/FluentMovementDataBuilder';
import { BoardCoordinate } from './BoardCoordinate';
import { Board } from './Board';

export class MovementData {
  public origin: BoardCoordinate = BoardCoordinate.at(0, 0);
  public destination: BoardCoordinate = BoardCoordinate.at(0, 0);
  public board: Board = new Board(0, 0);
  public movedPieces: Array<string> = new Array<string>();
  public whiteKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public whitePieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public blackKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public blackPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  constructor(builder: FluentMovementDataBuilder) {
  	this.origin = builder.origin;
  	this.destination = builder.destination;
  	this.board = builder.board;
  	this.movedPieces = builder.movedPieces;
  	this.whiteKing = builder.whiteKing;
  	this.whitePieces = builder.whitePieces;
  	this.blackKing = builder.blackKing;
  	this.blackPieces = builder.blackPieces;
  }
}