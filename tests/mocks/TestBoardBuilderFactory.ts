import IBoardBuilderFactory from '../../src/business/IBoardBuilderFactory';
import BoardBuilder from '../../src/business/BoardBuilder';
import GameType from '../../src/models/enums/GameType';
import BoardCoordinate from '../../src/models/BoardCoordinate';

import TestBoardBuilder from '../mocks/TestBoardBuilder';

class TestBoardBuilderFactory implements IBoardBuilderFactory {
  private piecesAt: Array<BoardCoordinate>;

  constructor(piecesAt: Array<BoardCoordinate>) {
    this.piecesAt = piecesAt;
  }

  createBoardBuilder(type: GameType): BoardBuilder {
    return new TestBoardBuilder(this.piecesAt);
  }
}

export default TestBoardBuilderFactory;