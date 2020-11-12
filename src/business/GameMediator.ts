import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';

import { Group } from 'three';

interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): boolean;
  loadBoard(): Promise<Board>;
  lookAtBoard(): Board;
  getTeamThatWon(): string;
}

export default GameMediator;