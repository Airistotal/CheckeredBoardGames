import ChessMediator from '../../../src/business/chess/ChessMediator';
import BoardCoordinate from '../../../src/models/BoardCoordinate';
import BoardPiece from '../../../src/models/BoardPiece';
import BoardPieceType from '../../../src/models/enums/BoardPieceType';
import BoardBuilder from '../../../src/business/BoardBuilder';
import Board from '../../../src/models/Board';
import GameType from '../../../src/models/enums/GameType';
import MovementJudge from '../../../src/business/MovementJudge';

import { expect } from 'chai';
import 'mocha';

describe('ChessMediator tests', () => {
	it('moves board pieces', () => {
		let mediator = new ChessMediator(new MockBoardBuilder(), new MovementJudgeAlwaysTrue());

		let piece = mediator.lookAtBoard().get(BoardCoordinate.at(1, 2)).GetPiece();
		mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let pieceAtDestination = mediator.lookAtBoard().get(BoardCoordinate.at(1, 3)).GetPiece();

		expect(piece).to.not.be.undefined;
		expect(mediator.lookAtBoard().get(BoardCoordinate.at(1, 2)).GetPiece()).to.be.undefined;
		expect(pieceAtDestination).to.not.be.undefined;
		if(piece === undefined || pieceAtDestination === undefined) return;
		expect(piece.id).to.eql(pieceAtDestination.id);
	});

	it('moves board pieces track first move', () => {
		let mediator = new ChessMediator(new MockBoardBuilder(), new MovementJudgeFirstMoveTrueNextMovesFalse());

		let firstmove = mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let secondmove = mediator.move(BoardCoordinate.at(1, 3), BoardCoordinate.at(1, 4));

		expect(firstmove).to.be.true;
		expect(secondmove).to.be.false;
	});
});

class MockBoardBuilder implements BoardBuilder {
	public createBoard() {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(1, 2)).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));

		return board;
	}
}

class MovementJudgeAlwaysTrue implements MovementJudge {
  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
  	return true;
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
  	return true;
  }
}

class MovementJudgeFirstMoveTrueNextMovesFalse implements MovementJudge {
  public isLegalMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
  	return false;
  }

  public isLegalFirstMove(origin: BoardCoordinate, destination: BoardCoordinate, board: Board) : boolean {
  	return true;
  }
}
