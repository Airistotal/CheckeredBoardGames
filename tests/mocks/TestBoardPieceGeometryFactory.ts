import BoardPieceGeometryFactory from '../../src/business/BoardPieceGeometryFactory';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPiece from '../../src/models/BoardPiece';

import { Mesh, ConeGeometry, MeshPhongMaterial, Object3D } from 'three';

class TestBoardPieceGeometryFactory implements BoardPieceGeometryFactory {
  public createGeometryFor(type: BoardPieceType): Promise<Object3D> {
    return new Promise((resolve, reject) => {
      var geometry = new ConeGeometry(0.35, 1, 16);
      var material = new MeshPhongMaterial({color: 0xffff00});

      resolve(new Mesh(geometry, material));
    });
  }
}

export default TestBoardPieceGeometryFactory;