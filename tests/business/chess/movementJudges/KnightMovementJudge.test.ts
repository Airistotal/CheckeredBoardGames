import KnightMovementJudge from '../../../../src/business/chess/movementJudges/KnightMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';

import { expect } from 'chai';
import 'mocha';

describe('KnightMovementJudge tests', () => {
	const validKnightMoves = [
    BoardCoordinate.at(2, 3),
    BoardCoordinate.at(2, 5),
    BoardCoordinate.at(6, 3),
    BoardCoordinate.at(6, 5),
    BoardCoordinate.at(3, 2),
    BoardCoordinate.at(3, 6),
    BoardCoordinate.at(5, 2),
    BoardCoordinate.at(5, 6)
  ];

  validKnightMoves.forEach((destination) => {
  	it(`knight can move from (4, 4) to destination ${destination.toString()}`, () => {
	    let board = new Board(8, 8);
	    let origin = BoardCoordinate.at(4, 4);
	    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Knight));

	    expect(new KnightMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
	    expect(new KnightMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  	})
  });

  const invalidKnightMoves = [
    BoardCoordinate.at(3, 3),
    BoardCoordinate.at(2, 2),
    BoardCoordinate.at(1,1),
    BoardCoordinate.at(5, 5),
    BoardCoordinate.at(4, 2),
    BoardCoordinate.at(4, 4)
  ];

  invalidKnightMoves.forEach((destination) => {
  	it(`knight cannot move from (4, 4) to destination ${destination.toString()}`, () => {
	    let board = new Board(8, 8);
	    let origin = BoardCoordinate.at(4, 4);
	    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Knight));

	    expect(new KnightMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
	    expect(new KnightMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  	})
  });

  it('knight can capture opposite color piece', () => {
	    let board = new Board(8, 8);
	    let origin = BoardCoordinate.at(4, 4);
	    let destination = BoardCoordinate.at(3, 2);
	    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Knight));
	    board.get(destination).SetPiece(new BoardPiece("black", BoardPieceType.Knight));

	    expect(new KnightMovementJudge().isLegalMove(origin, destination, board)).to.be.true;
	    expect(new KnightMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.true;
  })

  it('knight cannot capture same color piece', () => {
	    let board = new Board(8, 8);
	    let origin = BoardCoordinate.at(4, 4);
	    let destination = BoardCoordinate.at(3, 2);
	    board.get(origin).SetPiece(new BoardPiece("white", BoardPieceType.Knight));
	    board.get(destination).SetPiece(new BoardPiece("white", BoardPieceType.Knight));

	    expect(new KnightMovementJudge().isLegalMove(origin, destination, board)).to.be.false;
	    expect(new KnightMovementJudge().isLegalFirstMove(origin, destination, board)).to.be.false;
  })
});
