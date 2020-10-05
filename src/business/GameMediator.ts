import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';

import { Group } from 'three';

interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): boolean;
  loadBoard(callback: (x: Group) => void): void;
  lookAtBoard(): Board;
}

export default GameMediator;