import Board from '../models/Board';
import MovementData from '../models/MovementData';
import Team from '../models/enums/Team';

interface GameStateProcessor {
  isGameOverForTeam(board: Board, team: Team): boolean;
}

export default GameStateProcessor;