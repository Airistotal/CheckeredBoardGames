import AbstractPieceMovementJudgeFactory from '../../src/business/AbstractPieceMovementJudgeFactory';
import ChessPieceMovementJudgeFactory from '../../src/business/chess/ChessPieceMovementJudgeFactory';
import GameType from '../../src/models/enums/GameType';

import { expect } from 'chai';
import 'mocha';

describe('AbstractPieceMovementJudgeFactory tests', () => {
  it('Creates ChessPieceMovementJudgeFactory', () => {
    let sut = new AbstractPieceMovementJudgeFactory();

    let boardBuilder = sut.createPieceMovementJudgeFactory(GameType.Chess);

    expect(boardBuilder instanceof ChessPieceMovementJudgeFactory).to.be.true;
  })
});