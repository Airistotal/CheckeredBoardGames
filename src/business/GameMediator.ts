import { BoardCoordinate } from '../models/BoardCoordinate';
import { Board } from '../models/Board';
import { Team } from '../models/enums/Team';

import { Group } from 'three';

export interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): boolean;
  loadGame(): Promise<Group>;
  lookAtBoard(): Board;
  getTeamThatWon(): Team | undefined;
  getPromotionBox(): Group | undefined
}