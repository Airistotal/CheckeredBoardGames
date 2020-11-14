import { ChessPieceBuilder } from '../../../src/business/chess/ChessPieceBuilder';
import { BoardPiece } from '../../../src/models/BoardPiece';
import { GameType } from '../../../src/models/enums/GameType';
import { Team } from '../../../src/models/enums/Team';
import { BoardPieceType } from '../../../src/models/enums/BoardPieceType';
import { TestBoardPieceGeometryBuilder } from '../../mocks/TestBoardPieceGeometryBuilder';

import { expect } from 'chai';
import 'mocha';

describe('ChessPieceBuilder tests', () => {
  const pieceTypes = [
    BoardPieceType.Pawn,
    BoardPieceType.Knight,
    BoardPieceType.Bishop,
    BoardPieceType.Rook,
    BoardPieceType.Queen,
    BoardPieceType.King
  ];

  pieceTypes.forEach((pieceType) => {
    it(`make a ${BoardPieceType[pieceType]}`, () => {
      let sut = new ChessPieceBuilder((type: GameType) => new TestBoardPieceGeometryBuilder());

      sut.createBoardPiece(Team.White, pieceType)
         .then((piece) => {
          expect(piece.team).to.be.eql(Team.White);
          expect(piece.type).to.be.eql(pieceType);
         })
         .catch((e) => {
           expect(false).to.be.true;
         });
    });
  });
});