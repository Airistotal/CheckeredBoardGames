import BishopMovementJudge from '../../../../src/business/chess/movementJudges/BishopMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';

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
	    let origin = BoardCoordinate.at(4, 4);
	    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Bishop));

	    expect(new BishopMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
	    expect(new BishopMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
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
	    let origin = BoardCoordinate.at(4, 4);
	    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Bishop));

	    expect(new BishopMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
	    expect(new BishopMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  	})
	});

	it(`bishop cannot move over other pieces`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Bishop));
    board.get(BoardCoordinate.at(2, 2)).setPiece(new BoardPiece("white", BoardPieceType.Bishop));

    expect(new BishopMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new BishopMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
	});

	it(`bishop cannot capture piece on same team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Bishop));
    board.get(destination).setPiece(new BoardPiece("white", BoardPieceType.Bishop));

    expect(new BishopMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
    expect(new BishopMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
	});

	it(`bishop can capture piece on different team`, () => {
    let board = new Board(8, 8);
    let origin = BoardCoordinate.at(4, 4);
    let destination = BoardCoordinate.at(1, 1);
    board.get(origin).setPiece(new BoardPiece("white", BoardPieceType.Bishop));
    board.get(destination).setPiece(new BoardPiece("black", BoardPieceType.Bishop));

    expect(new BishopMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
    expect(new BishopMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
	});
});
