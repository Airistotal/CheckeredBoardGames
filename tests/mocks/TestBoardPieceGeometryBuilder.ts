import BoardPieceGeometryBuilder from '../../src/business/BoardPieceGeometryBuilder';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import BoardPiece from '../../src/models/BoardPiece';

import { Mesh, ConeGeometry, MeshPhongMaterial, Object3D } from 'three';

class TestBoardPieceGeometryBuilder implements BoardPieceGeometryBuilder {
  public createGeometryFor(type: BoardPieceType): Promise<Object3D> {
    return new Promise((resolve, reject) => {
      var geometry = new ConeGeometry(0.35, 1, 16);
      var material = new MeshPhongMaterial({color: 0xffff00});

      resolve(new Mesh(geometry, material));
    });
  }
}

export default TestBoardPieceGeometryBuilder;