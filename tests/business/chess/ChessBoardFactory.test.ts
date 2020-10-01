import ChessBoardBuilder from '../../../src/business/chess/ChessBoardBuilder';
import BoardCoordinate from '../../../src/models/BoardCoordinate';

import { expect } from 'chai';
import 'mocha';

describe('ChessBoardBuilder tests', () => {
  it('makes chess board with pieces', () => {
    let sut = new ChessBoardBuilder();

    let board = sut.createBoard();

    for (var i = 0; i < 8; i++) {
      let piece = board.get(BoardCoordinate.at(i + 1, 1)).GetPiece()
      expect(piece).to.not.be.undefined;

      piece = board.get(BoardCoordinate.at(i + 1, 2)).GetPiece()
      expect(piece).to.not.be.undefined;

      piece = board.get(BoardCoordinate.at(i + 1, 7)).GetPiece()
      expect(piece).to.not.be.undefined;

      piece = board.get(BoardCoordinate.at(i + 1, 8)).GetPiece()
      expect(piece).to.not.be.undefined;
    }
  });
});