import ChessBoardBuilder from '../../../src/business/chess/ChessBoardBuilder';
import BoardCoordinate from '../../../src/models/BoardCoordinate';
import TestBoardPieceFactory from '../../mocks/TestBoardPieceFactory';

import { expect } from 'chai';
import 'mocha';

describe('ChessBoardBuilder tests', () => {
  it('makes chess board with pieces', () => {
    let sut = new ChessBoardBuilder(new TestBoardPieceFactory());

    let board = sut.createBoard();

    for (var i = 0; i < 8; i++) {
      let piece = board.get(BoardCoordinate.at(i + 1, 1)).getPiece()
      expect(piece).to.not.be.undefined;

      piece = board.get(BoardCoordinate.at(i + 1, 2)).getPiece()
      expect(piece).to.not.be.undefined;

      piece = board.get(BoardCoordinate.at(i + 1, 7)).getPiece()
      expect(piece).to.not.be.undefined;

      piece = board.get(BoardCoordinate.at(i + 1, 8)).getPiece()
      expect(piece).to.not.be.undefined;
    }
  });
});