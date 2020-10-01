import BoardCoordinate from '../../src/models/BoardCoordinate';
import { expect } from 'chai';
import 'mocha';

describe('BoardCoordinate tests', () => {
  it('.at gets equal objects', () => {
    expect(BoardCoordinate.at(1, 1).Equals(BoardCoordinate.at(1, 1))).to.be.true;
  });

  it('toString returns coordinate', () => {
    expect(BoardCoordinate.at(1, 1).toString()).to.be.equal("(1, 1)");
  });

  it('can check by column', () => {
    let col = 1;

    expect(BoardCoordinate.at(col, 1).IsInCol(col)).to.be.true;
  });

  it('can check by row', () => {
    let row = 5;

    expect(BoardCoordinate.at(1, row).IsInRow(row)).to.be.true;
  });

  it('column must be 0 or more', () => {
    var err = new Error();

    try {
      BoardCoordinate.at(-1, 1);
    }
    catch(e) {
      err = e;
    }

    expect(err.message).to.be.equal('Invalid column <-1>');
  });

  it('row must be 0 or more', () => {
    var err = new Error();

    try {
      BoardCoordinate.at(1, -1);
    }
    catch(e) {
      err = e;
    }

    expect(err.message).to.be.equal('Invalid row <-1>');
  });

  it('row and column must be 0 or more', () => {
    var err = new Error();

    try {
      BoardCoordinate.at(-1, -1);
    }
    catch(e) {
      err = e;
    }

    expect(err.message).to.be.equal('Invalid column <-1> and row <-1>');
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
