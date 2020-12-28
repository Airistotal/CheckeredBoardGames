import { BoardCoordinate } from '../../src/models/BoardCoordinate';
import { expect } from 'chai';
import 'mocha';

describe('BoardCoordinate tests', () => {
  it('.at gets equal reference objects', () => {
    expect(BoardCoordinate.at(1, 1)).to.be.equal(BoardCoordinate.at(1, 1));
  });

  it('toString returns coordinate', () => {
    expect(BoardCoordinate.at(1, 1).toString()).to.be.equal("(1, 1)");
  });

  it('get vector from coordinates', () => {
    let v = BoardCoordinate.getVector(BoardCoordinate.at(1, 1), BoardCoordinate.at(1, 2));

    expect(v.x).to.eql(0);
    expect(v.y).to.eql(1);
  });

  it('get vector from coordinates', () => {
    let v = BoardCoordinate.getVector(BoardCoordinate.at(1, 1), BoardCoordinate.at(2, 1));

    expect(v.x).to.eql(1);
    expect(v.y).to.eql(0);
  });
});
