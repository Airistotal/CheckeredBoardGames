import MovementJudgeFactory from '../../src/business/MovementJudgeFactory';
import ChessMovementJudge from '../../src/business/chess/movementJudges/ChessMovementJudge';
import GameType from '../../src/models/enums/GameType';
import TestFactory from '../mocks/TestFactory';

import { expect } from 'chai';
import 'mocha';

describe('MovementJudgeFactory tests', () => {
  it('Creates ChessMovementJudge', () => {
    let sut = new MovementJudgeFactory(new TestFactory(true, true));

    let movementJudge = sut.createMovementJudge(GameType.Chess);

    expect(movementJudge instanceof ChessMovementJudge).to.be.true;
  })
});
