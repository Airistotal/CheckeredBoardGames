import { Board } from '../models/Board';
import { MovementData } from '../models/MovementData';
import { Team } from '../models/enums/Team';

export interface GameStateProcessor {
  isGameOverForTeam(board: Board, team: Team): boolean;
}