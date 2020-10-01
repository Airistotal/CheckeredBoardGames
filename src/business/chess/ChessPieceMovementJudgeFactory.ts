import PieceMovementJudgeFactory from '../PieceMovementJudgeFactory';
import BoardPieceType from '../../models/enums/BoardPieceType';
import MovementJudge from '../MovementJudge';
import PawnMovementJudge from './movementJudges/PawnMovementJudge';
import KnightMovementJudge from './movementJudges/KnightMovementJudge';
import BishopMovementJudge from './movementJudges/BishopMovementJudge';
import RookMovementJudge from './movementJudges/RookMovementJudge';
import QueenMovementJudge from './movementJudges/QueenMovementJudge';
import KingMovementJudge from './movementJudges/KingMovementJudge';

class ChessPieceMovementJudgeFactory implements PieceMovementJudgeFactory {
  createPieceMovementJudge(pieceType: BoardPieceType): MovementJudge {
    switch (pieceType) {
      case BoardPieceType.Pawn:
        return new PawnMovementJudge();
        break;
      
      case BoardPieceType.Knight:
        return new KnightMovementJudge();
        break;
      
      case BoardPieceType.Bishop:
        return new BishopMovementJudge();
        break;
      
      case BoardPieceType.Rook:
        return new RookMovementJudge();
        break;
      
      case BoardPieceType.Queen:
        return new QueenMovementJudge(new BishopMovementJudge(), new RookMovementJudge());
        break;
      
      case BoardPieceType.King:
        return new KingMovementJudge();
        break;
        
      default:
        throw Error(`No movement judge for ${pieceType}`)
        break;
    }
  }
}

export default ChessPieceMovementJudgeFactory;
