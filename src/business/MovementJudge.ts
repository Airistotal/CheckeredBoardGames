import { MovementData } from '../models/MovementData';

export interface MovementJudge {
  isLegalMove(movementData: MovementData) : boolean;
}