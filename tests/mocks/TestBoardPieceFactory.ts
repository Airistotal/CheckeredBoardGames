import BoardPieceFactory from '../../src/business/BoardPieceFactory';
import BoardPiece from '../../src/models/BoardPiece';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPieceGeometryFactory from '../../src/business/BoardPieceGeometryFactory';
import TestBoardPieceGeometryFactory from '../mocks/testBoardPieceGeometryFactory';

import { Mesh } from 'three';

class TestBoardPieceFactory implements BoardPieceFactory {
  private testBoardPieceGeometryFactory: BoardPieceGeometryFactory = new TestBoardPieceGeometryFactory();

  createBoardPiece(team: string, type: BoardPieceType): BoardPiece {
  	let piece = new BoardPiece(team, type, new Mesh())
    
    this.testBoardPieceGeometryFactory.createGeometryFor(type, (x) => {
    	piece.setRenderablePiece(x);
    });

    return piece;
  }
}

export default TestBoardPieceFactory;