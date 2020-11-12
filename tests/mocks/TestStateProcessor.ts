import GameStateProcessor from '../../src/business/GameStateProcessor';
import Board from '../../src/models/Board';
import MovementData from '../../src/models/MovementData';

class TestStateProcessor implements GameStateProcessor {
  isGameOverForTeam(board: Board, team: string): boolean {
    return false;
  }
}

export default TestStateProcessor;