import { AttackData } from '../models/AttackData';
import { GameState } from '../models/enums/GameState';

export interface GameStateProcessor {
  isGameOver(attackData: AttackData): boolean;
}