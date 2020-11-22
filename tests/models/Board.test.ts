import { Board } from '../../src/models/Board';
import { BoardPiece } from '../../src/models/BoardPiece';
import { BoardCoordinate } from '../../src/models/BoardCoordinate';
import { Team } from '../../src/models/enums/Team';
import { BoardPieceType } from '../../src/models/enums/BoardPieceType';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe("Board tests", () => {
    it("get coordinate without piece", () => {
      let board = new Board(8, 8);
      let tile = board.get(BoardCoordinate.at(1, 1));

      expect(tile).to.be.undefined;
    });

    it("get coordinate with piece", () => {
      let board = new Board(8, 8);
      board.set(BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
      let tile = board.get(BoardCoordinate.at(1, 1));

      expect(tile).to.be.not.undefined;
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
