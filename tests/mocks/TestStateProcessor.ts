import { GameStateProcessor } from '../../src/business/GameStateProcessor';
import { Board } from '../../src/models/Board';
import { MovementData } from '../../src/models/MovementData';
import { AttackData } from '../../src/models/AttackData';
import { Team } from '../../src/models/enums/Team';

export class TestStateProcessor implements GameStateProcessor {
  isGameOver(attackData: AttackData): boolean {
    return false; 
  }
}