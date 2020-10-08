import GameMediatorFactory from '../../src/business/GameMediatorFactory';
import ChessMediator from '../../src/business/chess/ChessMediator';
import GameType from '../../src/models/enums/GameType';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import BoardPiece from '../../src/models/BoardPiece';
import TestMovementJudgeFactory from '../mocks/TestMovementJudgeFactory';
import TestBoardBuilderFactory from '../mocks/TestBoardBuilderFactory';

import { expect } from 'chai';
import 'mocha';

describe('GameMediatorFactory tests', () => {
  it('Creates chessMediator', () => {
    let testMovementJudgeFactory = new TestMovementJudgeFactory(true, true);
    let testBoardBuilderFactory = new TestBoardBuilderFactory(new Map<BoardCoordinate, BoardPiece>());

    let sut = new GameMediatorFactory(testBoardBuilderFactory, testMovementJudgeFactory);

    let gameMediator = sut.createGameMediator(GameType.Chess);

    expect(gameMediator instanceof ChessMediator).to.be.true;
  })
});