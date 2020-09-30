import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';
import GameType from '../models/enums/GameType';

interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): void;
  lookAtBoard(): Board;
}

export default GameMediator;
