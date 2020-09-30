import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';

interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): boolean
  lookAtBoard(): Board;
}

export default GameMediator;