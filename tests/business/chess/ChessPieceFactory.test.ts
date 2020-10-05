import ChessPieceFactory from '../../../src/business/chess/ChessPieceFactory';
import BoardPiece from '../../../src/models/BoardPiece';
import BoardPieceType from '../../../src/models/enums/BoardPieceType';
import TestBoardPieceGeometryFactory from '../../mocks/TestBoardPieceGeometryFactory';

import { expect } from 'chai';
import 'mocha';

describe('ChessPieceFactory tests', () => {
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
      let sut = new ChessPieceFactory(new TestBoardPieceGeometryFactory());

      sut.createBoardPiece("white", pieceType)
         .then((piece) => {
          expect(piece.team).to.be.eql("white");
          expect(piece.type).to.be.eql(pieceType);
         })
         .catch((e) => {
           expect(false).to.be.true;
         });
    });
  });
});