import MovementData from '../models/MovementData';

interface MovementJudge {
  isLegalMove(movementData: MovementData) : boolean;
}

export default MovementJudge;
