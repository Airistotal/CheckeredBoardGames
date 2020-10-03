import BoardBuilderFactory from '../../src/business/BoardBuilderFactory';
import ChessBoardBuilder from '../../src/business/chess/ChessBoardBuilder';
import GameType from '../../src/models/enums/GameType';
import TestAbstractBoardPieceFactory from '../mocks/TestAbstractBoardPieceFactory';

import { expect } from 'chai';
import 'mocha';

describe('BoardBuilderFactory tests', () => {
  it('Creates chessBoardBuilder', () => {
    let sut = new BoardBuilderFactory(new TestAbstractBoardPieceFactory());

    let boardBuilder = sut.createBoardBuilder(GameType.Chess);

    expect(boardBuilder instanceof ChessBoardBuilder).to.be.true;
  })
});