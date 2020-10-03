import BoardPieceGeometryFactory from '../BoardPieceGeometryFactory';
import BoardPieceType from '../../models/enums/BoardPieceType';
import Utilities from '../Utilities';

import { Mesh, ConeGeometry, MeshPhongMaterial } from 'three';

class ChessPieceGeometryFactory implements BoardPieceGeometryFactory {
  createGeometryFor(type: BoardPieceType): Mesh {
    switch (type) {
      default:
        var geometry = new ConeGeometry( 0.35, 1, 16 );
        var material = new MeshPhongMaterial( {color: 0xffff00} );
        let pieceMesh = new Mesh( geometry, material );
        pieceMesh.rotateX(Utilities.degreesToRadians(90));
        pieceMesh.translateY(0.625);

        return pieceMesh;
        break;
    }
  }
}

export default ChessPieceGeometryFactory;
