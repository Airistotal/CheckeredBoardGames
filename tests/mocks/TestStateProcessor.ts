import GameStateProcessor from '../../src/business/GameStateProcessor';
import Board from '../../src/models/Board';
import MovementData from '../../src/models/MovementData';

class TestStateProcessor implements GameStateProcessor {
  isGameOver(board: Board): boolean {
    return false;
  }

  logMove(board: Board, mvDta: MovementData): void {

  }

  getScore(): string {
    return "-1";
  }

  getMoveHistory(): string {
    return "hist";
  }

  whoseTurnIsIt(): string {
    return "white";
  }
}

export default TestStateProcessor;