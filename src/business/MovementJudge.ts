import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';

interface MovementJudge {
  isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean;
  isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean;
}

export default MovementJudge;
