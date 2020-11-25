import { FluentAttackDataBuilder } from '../business/FluentAttackDataBuilder';
import { BoardCoordinate } from './BoardCoordinate';
import { Board } from './Board';

export class AttackData {
  public board: Board = new Board(0, 0);
  public defendingKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public attackingPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public defendingPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  constructor(builder: FluentAttackDataBuilder) {
    this.board = builder.board;
    this.defendingPieces = builder.defendingPieces;
    this.defendingKing = builder.defendingKing;
    this.attackingPieces = builder.attackingPieces;
  }
}