import Board from '../models/Board';
import MovementData from '../models/MovementData';

interface GameStateProcessor {
  isGameOverForTeam(board: Board, team: string): boolean;
}

export default GameStateProcessor;