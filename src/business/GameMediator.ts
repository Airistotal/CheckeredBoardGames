import { BoardCoordinate } from '../models/BoardCoordinate';
import { SelectedPromotion } from '../models/SelectedPromotion';
import { Board } from '../models/Board';
import { Team } from '../models/enums/Team';

import { Group } from 'three';

export interface GameMediator {
  move(origin: BoardCoordinate, destination: BoardCoordinate): boolean;
  promote(choice: SelectedPromotion): Promise<boolean>;
  loadGame(): Promise<Group>;
  lookAtBoard(): Board;
  getTeamThatWon(): Team | undefined;
  getPromotionBox(): Group | undefined;
}