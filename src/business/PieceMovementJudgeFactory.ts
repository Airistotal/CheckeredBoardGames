import BoardPieceType from '../models/enums/BoardPieceType';
import MovementJudge from './MovementJudge';

interface PieceMovementJudgeFactory {
  createPieceMovementJudge(pieceType: BoardPieceType): MovementJudge;
}

export default PieceMovementJudgeFactory;
