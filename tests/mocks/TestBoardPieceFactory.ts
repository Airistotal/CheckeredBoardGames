import BoardPieceFactory from '../../src/business/BoardPieceFactory';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPieceGeometryFactory from '../../src/business/BoardPieceGeometryFactory';

import { Mesh } from 'three';

class TestBoardPieceFactory implements BoardPieceFactory {
  createBoardPiece(team: string, type: BoardPieceType): Promise<BoardPiece> {
    return new Promise((resolve, reject) => {
      resolve(new BoardPiece(team, type, new Mesh()));
    });
  }
}

export default TestBoardPieceFactory;