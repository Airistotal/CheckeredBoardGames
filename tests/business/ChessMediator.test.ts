import ChessMediator from '../../src/business/ChessMediator';
import BoardCoordinate from '../../src/models/BoardCoordinate';
import IBoardFactory from '../../src/business/IBoardFactory';
import Board from '../../src/models/Board';
import GameType from '../../src/models/enums/GameType';

import { expect } from 'chai';
import 'mocha';

describe('ChessMediator tests', () => {
	it('moves board pieces', () => {
		let mediator = new ChessMediator(new MockBoardFactory());

		let piece = mediator.lookAtBoard().get(BoardCoordinate.at(1, 2)).GetPiece();
		mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let pieceAtDestination = mediator.lookAtBoard().get(BoardCoordinate.at(1, 3)).GetPiece();

		expect(piece).to.not.be.undefined;
		expect(pieceAtDestination).to.not.be.undefined;
		if(piece === undefined || pieceAtDestination === undefined) return;
		expect(piece.name).to.eql(pieceAtDestination.name);
	})
});

class MockBoardFactory implements IBoardFactory {
	public createBoard(type: GameType) {
		return new Board(8, 8);
	}
}
