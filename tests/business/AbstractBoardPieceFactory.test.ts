import AbstractBoardPieceFactory from '../../src/business/AbstractBoardPieceFactory';
import ChessPieceFactory from '../../src/business/chess/ChessPieceFactory';
import GameType from '../../src/models/enums/GameType';
import TestAbstractBoardPieceGeometryFactory from '../mocks/TestAbstractBoardPieceGeometryFactory';

import { expect } from 'chai';
import 'mocha';

describe('AbstractBoardPieceFactory tests', () => {
  it('Creates chessPieceFactory', () => {
    let sut = new AbstractBoardPieceFactory(new TestAbstractBoardPieceGeometryFactory());

    let chessPieceFactory = sut.createBoardPieceFactory(GameType.Chess);

    expect(chessPieceFactory instanceof ChessPieceFactory).to.be.true;
  })
});