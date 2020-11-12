import BoardCoordinate from '../models/BoardCoordinate';
import Board from '../models/Board';
import Team from '../models/enums/Team';

import { Group } from 'three';

interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): boolean;
  loadBoard(): Promise<Board>;
  lookAtBoard(): Board;
  getTeamThatWon(): Team | undefined;
}

export default GameMediator;