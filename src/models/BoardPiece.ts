import BoardPieceType from './enums/BoardPieceType';
import { v4 as uuidv4 } from 'uuid';

class BoardPiece {
  public readonly team: string;
  public readonly type: BoardPieceType;
  public readonly id = uuidv4();

  constructor(team: string, type: BoardPieceType) {
  	this.team = team;
    this.type = type;
  }
}

export default BoardPiece;
