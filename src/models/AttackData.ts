import { FluentAttackDataBuilder } from '../business/FluentAttackDataBuilder';
import { BoardCoordinate } from './BoardCoordinate';
import { Board } from './Board';

export class AttackData {
  public board: Board = new Board(0, 0);
  public defendingKing: BoardCoordinate = BoardCoordinate.at(0, 0);
  public enemyPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();
  public allyPieces: Array<BoardCoordinate> = new Array<BoardCoordinate>();

  constructor(builder: FluentAttackDataBuilder) {
    this.board = builder.board;
    this.defendingKing = builder.defendingKing;
    this.allyPieces = builder.allyPieces;
    this.enemyPieces = builder.enemyPieces;
  }
}