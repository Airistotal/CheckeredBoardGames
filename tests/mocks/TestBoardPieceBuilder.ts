import BoardPieceBuilder from '../../src/business/BoardPieceBuilder';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPieceGeometryBuilder from '../../src/business/BoardPieceGeometryBuilder';
import Team from '../../src/models/enums/Team';

import { Mesh } from 'three';

class TestBoardPieceBuilder implements BoardPieceBuilder {
  createBoardPiece(team: Team, type: BoardPieceType): Promise<BoardPiece> {
    return new Promise((resolve, reject) => {
      resolve(new BoardPiece(team, type, new Mesh()));
    });
  }
}

export default TestBoardPieceBuilder;