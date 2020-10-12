import ChessMovementJudge from '../../../../src/business/chess/movementJudges/ChessMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import MovementData from '../../../../src/models/MovementData';
import TestPieceMovementJudgeFactory from '../../../mocks/TestPieceMovementJudgeFactory';
import TargetedPieceMovementJudgeFactory from '../../../mocks/TargetedPieceMovementJudgeFactory';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('ChessMovementJudge tests', async () => {
	let chessMovementJudge = new ChessMovementJudge(new TestPieceMovementJudgeFactory(true, true));

	it('no origin piece cannot move', () => {
		let board = new Board(8, 8);
		let mvDta = new MovementData(BoardCoordinate.at(1, 1), BoardCoordinate.at(2, 1), board);

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('movement not on board cannot move there', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 8)).setPiece(new BoardPiece("black", BoardPieceType.King, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 8), BoardCoordinate.at(9, 9), board);

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('no king and can move', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 2)).setPiece(new BoardPiece("white", BoardPieceType.Pawn, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 2), BoardCoordinate.at(2, 2), board);

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('no opposing pieces and can move', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 2)).setPiece(new BoardPiece("white", BoardPieceType.Pawn, new Mesh()));
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece("white", BoardPieceType.King, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 2), BoardCoordinate.at(2, 2), board);

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('no opposing pieces and can move', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 2)).setPiece(new BoardPiece("white", BoardPieceType.Pawn, new Mesh()));
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece("white", BoardPieceType.King, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 2), BoardCoordinate.at(2, 2), board);

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('white king cannot move if black pieces attack destination', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece("white", BoardPieceType.King, new Mesh()));
		board.get(BoardCoordinate.at(7, 3)).setPiece(new BoardPiece("black", BoardPieceType.Queen, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 3), BoardCoordinate.at(2, 2), board);
		let judge = new ChessMovementJudge(new TargetedPieceMovementJudgeFactory([BoardCoordinate.at(2, 2)]));

		let moveSucces = judge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('black king cannot move if white pieces attack destination', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece("black", BoardPieceType.King, new Mesh()));
		board.get(BoardCoordinate.at(7, 3)).setPiece(new BoardPiece("white", BoardPieceType.Queen, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 3), BoardCoordinate.at(2, 2), board);
		let judge = new ChessMovementJudge(new TargetedPieceMovementJudgeFactory([BoardCoordinate.at(2, 2)]));

		let moveSucces = judge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('king in check can move out of check', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece("black", BoardPieceType.King, new Mesh()));
		board.get(BoardCoordinate.at(7, 3)).setPiece(new BoardPiece("white", BoardPieceType.Queen, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 3), BoardCoordinate.at(2, 2), board);
		let judge = new ChessMovementJudge(new TargetedPieceMovementJudgeFactory([BoardCoordinate.at(5, 3)]))

		debugger;

		let moveSucces = judge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});
});