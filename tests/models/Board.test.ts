import Board from '../../src/models/Board';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import { expect } from 'chai';
import 'mocha';

describe("Board tests", () => {
    it("get existing coordinate", () => {
      let board = new Board(8, 8);
      let tile = board.get(BoardCoordinate.at(1, 1));

      expect(tile).to.not.be.null;
      expect(tile).to.not.be.undefined;
    });

    it("get non-existent coordinate", () => {
    	let err = new Error();

    	try {
    		new Board(8, 8).get(BoardCoordinate.at(9, 1));
    	}
    	catch(e) {
    		err = e;
    	}

      expect(err.message).to.be.equal("(9, 1) is not a coordinate on the board.");
    });

    it("get renderable board map", () => {
      let renderableBoard = new Board(8, 8).getRenderableBoard();

      expect(renderableBoard).to.not.be.undefined;
    });
});
