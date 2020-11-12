import CheckMovementJudge from '../../../../src/business/chess/movementJudges/CheckMovementJudge';
import BoardCoordinate from '../../../../src/models/BoardCoordinate';
import BoardPiece from '../../../../src/models/BoardPiece';
import BoardPieceType from '../../../../src/models/enums/BoardPieceType';
import Board from '../../../../src/models/Board';
import GameType from '../../../../src/models/enums/GameType';
import MovementData from '../../../../src/models/MovementData';
import TestMovementJudge from '../../../mocks/TestMovementJudge';

import { Mesh } from 'three';
import { expect } from 'chai';
import 'mocha';

describe('CheckMovementJudge tests', async () => {
  let checkMovementJudge = new CheckMovementJudge((type: GameType) => (type: BoardPieceType) => new TestMovementJudge(true, true));

  it('Origin piece moves and doesn\'t put own king in check can move', () => {
    let board = new Board(8, 8);
    let mvDta = new MovementData(BoardCoordinate.at(1, 1), BoardCoordinate.at(2, 1), board);

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.true;
  });

  it('Origin piece moves and puts own king in check can\'t move', () => {
    let board = new Board(8, 8);
    let mvDta = new MovementData(BoardCoordinate.at(1, 1), BoardCoordinate.at(2, 1), board);

    let moveSucces = checkMovementJudge.isLegalMove(mvDta);

    expect(moveSucces).to.be.false;
  });
});