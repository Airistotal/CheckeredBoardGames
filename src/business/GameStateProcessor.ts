import Board from '../models/Board';
import MovementData from '../models/MovementData';

interface GameStateProcessor {
  isGameOver(board: Board): boolean;
  logMove(board: Board, mvDta: MovementData): void;
  getScore(): string;
  getMoveHistory(): string;
  whoseTurnIsIt(): string;
}

export default GameStateProcessor;