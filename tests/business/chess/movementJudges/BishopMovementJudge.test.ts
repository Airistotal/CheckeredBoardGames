import { BishopMovementJudge } from '../../../../src/business/chess/movementJudges/BishopMovementJudge';
import { BoardCoordinate } from '../../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../../src/models/BoardPiece';
import { BoardPieceType } from '../../../../src/models/enums/BoardPieceType';
import { Team } from '../../../../src/models/enums/Team';
import { Board } from '../../../../src/models/Board';
import { MovementData } from '../../../../src/models/MovementData';
import { FluentMovementDataBuilder } from '../../../../src/business/FluentMovementDataBuilder';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('BishopMovementJudge tests', () => {
	const validBishopMoves = [
		BoardCoordinate.at(1, 1),
		BoardCoordinate.at(2, 2),
		BoardCoordinate.at(3, 3),
		BoardCoordinate.at(5, 5),
		BoardCoordinate.at(6, 6),
		BoardCoordinate.at(7, 7),
		BoardCoordinate.at(8, 8),
		BoardCoordinate.at(1, 7),
		BoardCoordinate.at(2, 6),
		BoardCoordinate.at(3, 5),
		BoardCoordinate.at(5, 3),
		BoardCoordinate.at(6, 2),
		BoardCoordinate.at(7, 1),
	];

	validBishopMoves.forEach((destination) => {
  	it(`bishop can move from (4, 4) to destination ${destination.toString()}`, () => {
	    let board = new Board(8, 8);
      let mvDta = FluentMovementDataBuilder.MovementData()
                                           .on(board)
                                           .from(BoardCoordinate.at(4, 4))
                                           .to(destination);

	    board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));

	    expect(new BishopMovementJudge().isLegalMove(mvDta)).to.be.true;
  	})
	});

	const invalidBishopMoves = [
		BoardCoordinate.at(1, 3),
		BoardCoordinate.at(2, 8),
		BoardCoordinate.at(3, 4),
		BoardCoordinate.at(7, 6),
		BoardCoordinate.at(6, 1)
	];

	invalidBishopMoves.forEach((destination) => {
  	it(`bishop cannot move from (4, 4) to destination ${destination.toString()}`, () => {
      let board = new Board(8, 8);
      let mvDta = FluentMovementDataBuilder.MovementData()
                                           .on(board)
                                           .from(BoardCoordinate.at(4, 4))
                                           .to(destination);
      board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));

      expect(new BishopMovementJudge().isLegalMove(mvDta)).to.be.false;
  	})
	});

	it(`bishop cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(4, 4))
                                         .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));
    board.set(BoardCoordinate.at(2, 2), new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));

    expect(new BishopMovementJudge().isLegalMove(mvDta)).to.be.false;
	});

	it(`bishop cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(4, 4))
                                         .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));
    board.set(mvDta.destination, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));

    expect(new BishopMovementJudge().isLegalMove(mvDta)).to.be.false;
	});

	it(`bishop can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(4, 4))
                                         .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Bishop, new Mesh()));

    expect(new BishopMovementJudge().isLegalMove(mvDta)).to.be.true;
	});

  it(`bishop can move everywhere with attack, returns all possible moves`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(4, 4))
                                         .to(BoardCoordinate.at(1, 1));

    board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Bishop, new Mesh()));

    expect(new BishopMovementJudge().getPossibleMoves(mvDta).length).to.be.equal(13);
  });

  it(`bishop can move everywhere but one, returns all possible moves`, () => {
    let board = new Board(8, 8);
    let mvDta = FluentMovementDataBuilder.MovementData()
                                         .on(board)
                                         .from(BoardCoordinate.at(4, 4))
                                         .to(BoardCoordinate.at(2, 2));

    board.set(mvDta.origin, new BoardPiece(Team.White, BoardPieceType.Bishop, new Mesh()));
    board.set(mvDta.destination, new BoardPiece(Team.Black, BoardPieceType.Bishop, new Mesh()));

    expect(new BishopMovementJudge().getPossibleMoves(mvDta).length).to.be.equal(12);
  });
});
