import GameStateProcessor from '../../src/business/GameStateProcessor';
import Board from '../../src/models/Board';
import MovementData from '../../src/models/MovementData';
import Team from '../../src/models/enums/Team';

class TestStateProcessor implements GameStateProcessor {
  isGameOverForTeam(board: Board, team: Team): boolean {
    return false;
  }
}

export default TestStateProcessor;