import { AttackData } from '../models/AttackData';

export interface GameStateProcessor {
  isGameOver(attackData: AttackData): boolean;
}