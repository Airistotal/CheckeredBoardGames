import { ChessBoardBuilder } from '../../../src/business/chess/ChessBoardBuilder';
import { BoardCoordinate } from '../../../src/models/BoardCoordinate';
import { GameType } from '../../../src/models/enums/GameType';
import { TestBoardPieceBuilder } from '../../mocks/TestBoardPieceBuilder';

import { expect } from 'chai';
import 'mocha';

describe('ChessBoardBuilder tests', () => {
  it('makes chess board with pieces', () => {
    let sut = new ChessBoardBuilder((type: GameType) => new TestBoardPieceBuilder());

    let boardPromise = sut.createBoard();

    boardPromise.then((board) => {
      for (var i = 0; i < 8; i++) {
        let piece = board.get(BoardCoordinate.at(i + 1, 1));
        expect(piece).to.not.be.undefined;

        piece = board.get(BoardCoordinate.at(i + 1, 2));
        expect(piece).to.not.be.undefined;

        piece = board.get(BoardCoordinate.at(i + 1, 7));
        expect(piece).to.not.be.undefined;

        piece = board.get(BoardCoordinate.at(i + 1, 8));
        expect(piece).to.not.be.undefined;
      }
    })
    .catch((e) => {
      expect(false).to.be.true;
    });
  });
});