import GameStateProcessor from '../GameStateProcessor';
import Board from '../../models/Board';
import MovementData from '../../models/MovementData';

class ChessStateProcessor implements GameStateProcessor {
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

export default ChessStateProcessor;