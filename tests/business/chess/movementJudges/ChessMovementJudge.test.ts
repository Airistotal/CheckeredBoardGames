import ChessMovementJudge from '../../../../src/business/chess/movementJudges/ChessMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import GameType from '../../../../src/models/enums/GameType';
import MovementData from '../../../../src/models/MovementData';
import TestMovementJudge from '../../../mocks/TestMovementJudge';
import TargetedMovementJudge from '../../../mocks/TargetedMovementJudge';
import Team from '../../../../src/models/enums/Team';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('ChessMovementJudge tests', async () => {
	let chessMovementJudge = new ChessMovementJudge((type: GameType) => (type: BoardPieceType) => new TestMovementJudge(true, true));

	it('no origin piece cannot move', () => {
		let board = new Board(8, 8);
		let mvDta = new MovementData(BoardCoordinate.at(1, 1), BoardCoordinate.at(2, 1), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('movement not on board cannot move there', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 8)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 8), BoardCoordinate.at(9, 9), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('no king and can move', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 2)).setPiece(new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 2), BoardCoordinate.at(2, 2), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('no opposing pieces and can move', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 2)).setPiece(new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 2), BoardCoordinate.at(2, 2), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('no opposing pieces and can move', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 2)).setPiece(new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 2), BoardCoordinate.at(2, 2), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('white king cannot move if black pieces attack destination', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
		board.get(BoardCoordinate.at(7, 3)).setPiece(new BoardPiece(Team.Black, BoardPieceType.Queen, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 3), BoardCoordinate.at(2, 2), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());
		let judge = new ChessMovementJudge((type: GameType) => (type: BoardPieceType) => new TargetedMovementJudge([BoardCoordinate.at(2, 2)]));

		let moveSucces = judge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('black king cannot move if white pieces attack destination', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));
		board.get(BoardCoordinate.at(7, 3)).setPiece(new BoardPiece(Team.White, BoardPieceType.Queen, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 3), BoardCoordinate.at(2, 2), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());
		let judge = new ChessMovementJudge((type: GameType) => (type: BoardPieceType) => new TargetedMovementJudge([BoardCoordinate.at(2, 2)]));

		let moveSucces = judge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('king in check can move out of check', () => {
		let board = new Board(8, 8);
		board.get(BoardCoordinate.at(5, 3)).setPiece(new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));
		board.get(BoardCoordinate.at(7, 3)).setPiece(new BoardPiece(Team.White, BoardPieceType.Queen, new Mesh()));
		let mvDta = new MovementData(BoardCoordinate.at(5, 3), BoardCoordinate.at(2, 2), board, new Array<BoardCoordinate>(), new Array<BoardCoordinate>());
		let judge = new ChessMovementJudge((type: GameType) => (type: BoardPieceType) => new TargetedMovementJudge([BoardCoordinate.at(5, 3)]))

		debugger;

		let moveSucces = judge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});
});