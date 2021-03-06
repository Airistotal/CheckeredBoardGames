import { ChessMediator } from '../../../src/business/chess/ChessMediator';
import { BoardCoordinate } from '../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../src/models/BoardPiece';
import { BoardPieceType } from '../../../src/models/enums/BoardPieceType';
import { GameType } from '../../../src/models/enums/GameType';
import { TestBoardBuilder } from '../../mocks/TestBoardBuilder';
import { TestMovementJudge } from '../../mocks/TestMovementJudge';
import { TestStateProcessor } from '../../mocks/TestStateProcessor';
import { TestPromotionBoxBuilder } from '../../mocks/TestPromotionBoxBuilder';
import { TestBoardPieceBuilder } from '../../mocks/TestBoardPieceBuilder';
import { Team } from '../../../src/models/enums/Team';

import { Group, Mesh } from 'three'
import { expect } from 'chai';
import 'mocha';

describe('ChessMediator tests', () => {
	it('moves board pieces', async () => {
		let mediator = new ChessMediator(
			(type: GameType) => new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece>([
				[BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh())]
			])),
			(type: GameType) => new TestMovementJudge(true, true),
			(type: GameType) => new TestStateProcessor(),
			(type: GameType) => new TestPromotionBoxBuilder(),
			(type: GameType) => new TestBoardPieceBuilder());

		await mediator.loadGame();

		let piece = mediator.lookAtBoard().get(BoardCoordinate.at(1, 2));
		mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let pieceAtDestination = mediator.lookAtBoard().get(BoardCoordinate.at(1, 3));

		expect(piece).to.not.be.undefined;
		expect(mediator.lookAtBoard().get(BoardCoordinate.at(1, 2))).to.be.undefined;
		expect(pieceAtDestination).to.not.be.undefined;
		if(piece === undefined || pieceAtDestination === undefined) return;
		expect(piece.id).to.eql(pieceAtDestination.id);
	});

	it('moves board pieces track first move', async () => {
		let mediator = new ChessMediator(
			(type: GameType) => new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece>([
				[BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh())]
			])),
			(type: GameType) => new TestMovementJudge(false, true),
			(type: GameType) => new TestStateProcessor(),
			(type: GameType) => new TestPromotionBoxBuilder(),
			(type: GameType) => new TestBoardPieceBuilder());

		await mediator.loadGame();

		let firstmove = mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let secondmove = mediator.move(BoardCoordinate.at(1, 3), BoardCoordinate.at(1, 4));

		expect(firstmove).to.be.true;
		expect(secondmove).to.be.false;
	});

	it('moves board pieces alternate team moves', async () => {
		let mediator = new ChessMediator(
			(type: GameType) => new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece>([
				[BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh())],
				[BoardCoordinate.at(2, 2), new BoardPiece(Team.Black, BoardPieceType.Pawn, new Mesh())]
			])),
			(type: GameType) => new TestMovementJudge(true, true),
			(type: GameType) => new TestStateProcessor(),
			(type: GameType) => new TestPromotionBoxBuilder(),
			(type: GameType) => new TestBoardPieceBuilder());

		await mediator.loadGame()

		let firstmove = mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));
		let secondmove = mediator.move(BoardCoordinate.at(2, 2), BoardCoordinate.at(2, 3));
		let thirdmove = mediator.move(BoardCoordinate.at(2, 3), BoardCoordinate.at(2, 4));

		expect(firstmove).to.be.true;
		expect(secondmove).to.be.true;
		expect(thirdmove).to.be.false;
	});

	it('when castling moves king and rook', async () => {
		debugger;
		
		let mediator = new ChessMediator(
			(type: GameType) => new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece>([
				[BoardCoordinate.at(5, 1), new BoardPiece(Team.White, BoardPieceType.King, new Mesh())],
				[BoardCoordinate.at(8, 1), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh())]
			])),
			(type: GameType) => new TestMovementJudge(true, true),
			(type: GameType) => new TestStateProcessor(),
			(type: GameType) => new TestPromotionBoxBuilder(),
			(type: GameType) => new TestBoardPieceBuilder());

		await mediator.loadGame();

		let castleResult = mediator.move(BoardCoordinate.at(5, 1), BoardCoordinate.at(7, 1));
		let kingDest = mediator.lookAtBoard().get(BoardCoordinate.at(7, 1));
		let rookDest = mediator.lookAtBoard().get(BoardCoordinate.at(6, 1));

		expect(kingDest).to.not.be.undefined;
		expect(rookDest).to.not.be.undefined;
		expect(castleResult).to.be.true;
	});

	it('executes en passant attack', async () => {
		let mediator = new ChessMediator(
			(type: GameType) => new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece>([
				[BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh())],
				[BoardCoordinate.at(2, 4), new BoardPiece(Team.Black, BoardPieceType.Pawn, new Mesh())]
			])),
			(type: GameType) => new TestMovementJudge(true, true),
			(type: GameType) => new TestStateProcessor(),
			(type: GameType) => new TestPromotionBoxBuilder(),
			(type: GameType) => new TestBoardPieceBuilder());

		await mediator.loadGame();
		
		mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 4));
		let enpassantResult = mediator.move(BoardCoordinate.at(2, 4), BoardCoordinate.at(1, 3));

		expect(enpassantResult).to.be.true;
	});

	it('keeps track of team piece coordinates', async () => {
		let mediator = new ChessMediator(
			(type: GameType) => new TestBoardBuilder(new Map<BoardCoordinate, BoardPiece>([
				[BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh())],
				[BoardCoordinate.at(2, 4), new BoardPiece(Team.Black, BoardPieceType.Pawn, new Mesh())]
			])),
			(type: GameType) => new TestMovementJudge(true, true),
			(type: GameType) => new TestStateProcessor(),
			(type: GameType) => new TestPromotionBoxBuilder(),
			(type: GameType) => new TestBoardPieceBuilder());

		await mediator.loadGame();

		mediator.move(BoardCoordinate.at(1, 2), BoardCoordinate.at(1, 3));

		let found = false;
		mediator.whitePieceCoords.forEach((coord) => {
			if (coord === BoardCoordinate.at(1, 3)) {
				found = true;
			}
		});

		let coordNotIn = true;
		mediator.whitePieceCoords.forEach((coord) => {
			if (coord === BoardCoordinate.at(1, 2)) {
				coordNotIn = false;
			}
		});

		expect(found).to.be.true;
		expect(coordNotIn).to.be.true;
	});
});
