import { CheckMovementJudge } from '../../../../src/business/chess/movementJudges/CheckMovementJudge';
import { KingMovementJudge } from '../../../../src/business/chess/movementJudges/KingMovementJudge';
import { MovementJudge } from '../../../../src/business/MovementJudge';
import { RookMovementJudge } from '../../../../src/business/chess/movementJudges/RookMovementJudge';
import { BoardCoordinate } from '../../../../src/models/BoardCoordinate';
import { BoardPiece } from '../../../../src/models/BoardPiece';
import { BoardPieceType } from '../../../../src/models/enums/BoardPieceType';
import { MovementJudgeType } from '../../../../src/models/enums/MovementJudgeType';
import { Board } from '../../../../src/models/Board';
import { GameType } from '../../../../src/models/enums/GameType';
import { Team } from '../../../../src/models/enums/Team';
import { MovementData } from '../../../../src/models/MovementData';
import { TestMovementJudge } from '../../../mocks/TestMovementJudge';
import { FluentMovementDataBuilder } from '../../../../src/business/FluentMovementDataBuilder';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';


let mvJudgeFactory = (type: GameType) => (type: MovementJudgeType): MovementJudge => {
  switch (type) {
    case MovementJudgeType.King:
      return new KingMovementJudge();
      break;

     case MovementJudgeType.Rook:
      return new RookMovementJudge();
      break;
    
    default:
      return new TestMovementJudge(true, true);
      break;
  }
}

describe('CheckMovementJudge tests', async () => {
  let checkMovementJudge = new CheckMovementJudge(mvJudgeFactory);

  it('Origin piece moves and doesn\'t put own king in check can move', () => {
    let board = new Board(8, 8);
    board.set(BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.set(BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.set(BoardCoordinate.at(2, 3), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh()));

    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(1, 1))
      .to(BoardCoordinate.at(2, 1))
      .withDefendingKingOn(BoardCoordinate.at(1, 2))
      .withAttackingPiecesOn(new Array<BoardCoordinate>(BoardCoordinate.at(2, 3)))
      .build();

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.true;
  });

  it('Origin piece moves and own king in check can\'t move', () => {
    let board = new Board(8, 8);
    board.set(BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.set(BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.set(BoardCoordinate.at(3, 2), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh()));

    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(1, 1))
      .to(BoardCoordinate.at(2, 1))
      .withDefendingKingOn(BoardCoordinate.at(1, 2))
      .withAttackingPiecesOn(new Array<BoardCoordinate>(BoardCoordinate.at(3, 2)))
      .build();

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.false;
  });

  it('King moves into check can\'t move', () => {
    let board = new Board(8, 8);
    board.set(BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.set(BoardCoordinate.at(1, 8), new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.set(BoardCoordinate.at(3, 2), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh()));

    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(1, 1))
      .to(BoardCoordinate.at(1, 2))
      .withDefendingKingOn(BoardCoordinate.at(1, 2))
      .withAttackingPiecesOn(new Array<BoardCoordinate>(BoardCoordinate.at(3, 2)))
      .build();
    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.false;
  });

  it('King moves out of check can move', () => {
    let board = new Board(8, 8);
    board.set(BoardCoordinate.at(1, 2), new BoardPiece(Team.White, BoardPieceType.King, new Mesh()));
    board.set(BoardCoordinate.at(1, 1), new BoardPiece(Team.White, BoardPieceType.Rook, new Mesh()));
    board.set(BoardCoordinate.at(3, 2), new BoardPiece(Team.Black, BoardPieceType.Rook, new Mesh()));

    debugger;

    let mvDta = FluentMovementDataBuilder
      .MovementData()
      .on(board)
      .from(BoardCoordinate.at(1, 2))
      .to(BoardCoordinate.at(2, 3))
      .withDefendingKingOn(BoardCoordinate.at(1, 2))
      .withAttackingPiecesOn(new Array<BoardCoordinate>(BoardCoordinate.at(3, 2)))
      .build();

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.true;
  });
});