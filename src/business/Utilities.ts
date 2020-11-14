import { BoardPieceType } from '../models/enums/BoardPieceType';
import { MovementJudgeType } from '../models/enums/MovementJudgeType';

export class Utilities {
  public static degreesToRadians(degrees: number): number
  {
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  public static getMovementJudgeTypeFor(type: BoardPieceType) {
  	switch (type) {
  		case BoardPieceType.Pawn:
  			return MovementJudgeType.Pawn;
  			break;
  		
  		case BoardPieceType.Knight:
  			return MovementJudgeType.Knight;
  			break;
  		
  		case BoardPieceType.Bishop:
  			return MovementJudgeType.Bishop;
  			break;
  		
  		case BoardPieceType.Rook:
  			return MovementJudgeType.Rook;
  			break;
  		
  		case BoardPieceType.Queen:
  			return MovementJudgeType.Queen;
  			break;
  		
  		case BoardPieceType.King:
  			return MovementJudgeType.King;
  			break;
  	}
  }
}