import ChessPieceMovementJudgeFactory from '../../../src/business/chess/ChessPieceMovementJudgeFactory';
import BoardPieceType from '../../../src/models/enums/BoardPieceType';
import PawnMovementJudge from '../../../src/business/chess/movementJudges/PawnMovementJudge';
import KnightMovementJudge from '../../../src/business/chess/movementJudges/KnightMovementJudge';
import BishopMovementJudge from '../../../src/business/chess/movementJudges/BishopMovementJudge';
import RookMovementJudge from '../../../src/business/chess/movementJudges/RookMovementJudge';
import QueenMovementJudge from '../../../src/business/chess/movementJudges/QueenMovementJudge';
import KingMovementJudge from '../../../src/business/chess/movementJudges/KingMovementJudge';

import { expect } from 'chai';
import 'mocha';

describe("ChessPieceMovementJudgeFactory tests", () => {
  it("Create pawn movement judge factory", () => {
    let sut = new ChessPieceMovementJudgeFactory();

    let judge = sut.createPieceMovementJudge(BoardPieceType.Pawn);

    expect(judge instanceof PawnMovementJudge).to.be.true;
  });

  it("Create knight movement judge factory", () => {
    let sut = new ChessPieceMovementJudgeFactory();

    let judge = sut.createPieceMovementJudge(BoardPieceType.Pawn);

    expect(judge instanceof KnightMovementJudge).to.be.true;
  });

  it("Create bishop movement judge factory", () => {
    let sut = new ChessPieceMovementJudgeFactory();

    let judge = sut.createPieceMovementJudge(BoardPieceType.Pawn);

    expect(judge instanceof BishopMovementJudge).to.be.true;
  });

  it("Create rook movement judge factory", () => {
    let sut = new ChessPieceMovementJudgeFactory();

    let judge = sut.createPieceMovementJudge(BoardPieceType.Pawn);

    expect(judge instanceof RookMovementJudge).to.be.true;
  });

  it("Create queen movement judge factory", () => {
    let sut = new ChessPieceMovementJudgeFactory();

    let judge = sut.createPieceMovementJudge(BoardPieceType.Pawn);

    expect(judge instanceof QueenMovementJudge).to.be.true;
  });

  it("Create king movement judge factory", () => {
    let sut = new ChessPieceMovementJudgeFactory();

    let judge = sut.createPieceMovementJudge(BoardPieceType.Pawn);

    expect(judge instanceof KingMovementJudge).to.be.true;
  });
});