import { MovementData } from '../models/MovementData';
import { Board } from '../models/Board';
import { BoardCoordinate } from '../models/BoardCoordinate';

export interface MovementJudge {
  isLegalMove(movementData: MovementData) : boolean;
  getPossibleMoves(movementData: MovementData): Array<BoardCoordinate>;
}