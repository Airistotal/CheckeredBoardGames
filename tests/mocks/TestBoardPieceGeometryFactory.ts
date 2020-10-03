import BoardPieceGeometryFactory from '../../src/business/BoardPieceGeometryFactory';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPiece from '../../src/models/BoardPiece';

import { Mesh, ConeGeometry, MeshPhongMaterial } from 'three';

class TestBoardPieceGeometryFactory implements BoardPieceGeometryFactory {
  public createGeometryFor(type: BoardPieceType): Mesh {
    var geometry = new ConeGeometry( 0.35, 1, 16 );
    var material = new MeshPhongMaterial( {color: 0xffff00} );
    let mesh = new Mesh( geometry, material );

    return mesh;
  }
}

export default TestBoardPieceGeometryFactory;