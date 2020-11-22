import { ChessMovementJudge } from '../../../../src/business/chess/movementJudges/ChessMovementJudge';
import { BoardCoordinate } from '../../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../../src/models/BoardPiece';
import { MovementJudgeType } from '../../../../src/models/enums/MovementJudgeType';
import { BoardPieceType } from '../../../../src/models/enums//BoardPieceType';
import { Board } from '../../../../src/models/Board';
import { GameType } from '../../../../src/models/enums/GameType';
import { MovementData } from '../../../../src/models/MovementData';
import { TestMovementJudge } from '../../../mocks/TestMovementJudge';
import { TargetedMovementJudge } from '../../../mocks/TargetedMovementJudge';
import { Team } from '../../../../src/models/enums/Team';
import { FluentMovementDataBuilder } from '../../../../src/business/FluentMovementDataBuilder';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('ChessMovementJudge tests', async () => {
	let chessMovementJudge = new ChessMovementJudge((type: GameType) => (type: MovementJudgeType) => new TestMovementJudge(true, true));

	it('no origin piece cannot move', () => {
		let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(1, 1))
      .to(BoardCoordinate.at(2, 1));

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('movement not on board cannot move there', () => {
		let board = new Board(8, 8);
		board.set(BoardCoordinate.at(5, 8), new BoardPiece(Team.Black, BoardPieceType.King, new Mesh()));
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 8))
      .to(BoardCoordinate.at(9, 9));

    debugger;
    
		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.false;
	});

	it('no king and can move', () => {
		let board = new Board(8, 8);
		board.set(BoardCoordinate.at(5, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 2))
      .to(BoardCoordinate.at(2, 2));

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('no opposing pieces and can move', () => {
		let board = new Board(8, 8);
		board.set(BoardCoordinate.at(5, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
		board.set(BoardCoordinate.at(5, 3), new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 2))
      .to(BoardCoordinate.at(2, 2));

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});

	it('no opposing pieces and can move', () => {
		let board = new Board(8, 8);
		board.set(BoardCoordinate.at(5, 2), new BoardPiece(Team.White, BoardPieceType.Pawn, new Mesh()));
		board.set(BoardCoordinate.at(5, 3), new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(5, 2))
      .to(BoardCoordinate.at(2, 2));

		let moveSucces = chessMovementJudge.isLegalMove(mvDta);

		expect(moveSucces).to.be.true;
	});
});