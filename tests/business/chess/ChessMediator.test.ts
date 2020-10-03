import ChessMediator from '../../../src/business/chess/ChessMediator';
import BoardCoordinate from '../../../src/models/BoardCoordinate';
import GameType from '../../../src/models/enums/GameType';
import TestMovementJudge from '../../mocks/TestMovementJudge';
import TestBoardBuilder from '../../mocks/TestBoardBuilder';

import { expect } from 'chai';
import 'mocha';

describe('ChessMediator tests', () => {
	it('moves board pieces', () => {
		let mediator = new ChessMediator(new TestBoardBuilder([BoardCoordinate.at(1, 2)]), new TestMovementJudge(true, true));

		let piece = mediator.lookAtBoard().get(BoardCoordinate.at(1, 2)).getPiece();
		mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let pieceAtDestination = mediator.lookAtBoard().get(BoardCoordinate.at(1, 3)).getPiece();

		expect(piece).to.not.be.undefined;
		expect(mediator.lookAtBoard().get(BoardCoordinate.at(1, 2)).getPiece()).to.be.undefined;
		expect(pieceAtDestination).to.not.be.undefined;
		if(piece === undefined || pieceAtDestination === undefined) return;
		expect(piece.id).to.eql(pieceAtDestination.id);
	});

	it('moves board pieces track first move', () => {
		let mediator = new ChessMediator(new TestBoardBuilder([BoardCoordinate.at(1, 2)]), new TestMovementJudge(false, true));

		let firstmove = mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let secondmove = mediator.move(BoardCoordinate.at(1, 3), BoardCoordinate.at(1, 4));

		expect(firstmove).to.be.true;
		expect(secondmove).to.be.false;
	});
});
