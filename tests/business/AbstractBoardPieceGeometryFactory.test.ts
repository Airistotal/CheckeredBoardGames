import AbstractBoardPieceGeometryFactory from '../../src/business/AbstractBoardPieceGeometryFactory';
import ChessPieceGeometryFactory from '../../src/business/chess/ChessPieceGeometryFactory';
import GameType from '../../src/models/enums/GameType';

import { expect } from 'chai';
import 'mocha';

describe('AbstractBoardPieceFactory tests', () => {
  it('Creates chessPieceFactory', () => {
    let sut = new AbstractBoardPieceGeometryFactory();

    let chessPieceFactory = sut.createBoardPieceGeometryFactory(GameType.Chess);

    expect(chessPieceFactory instanceof ChessPieceGeometryFactory).to.be.true;
  })
});