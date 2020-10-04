import BoardPieceGeometryFactory from '../BoardPieceGeometryFactory';
import BoardPieceType from '../../models/enums/BoardPieceType';
import Utilities from '../Utilities';

import { Mesh, ConeGeometry, MeshPhongMaterial, Object3D } from 'three';

import { STLLoader } from '../loaders/STLLoader';

class ChessPieceGeometryFactory implements BoardPieceGeometryFactory {
  public createGeometryFor(type: BoardPieceType, callback: (x: Object3D) => void): void {
    switch (type) {
      case BoardPieceType.Pawn:
        callback(this.getCone());
        this.LoadSTL('res/STL/Pawn.stl', callback);
      default:
        callback(this.getCone());
        break;
    }
  }

  private getCone(): Object3D {
    var geometry = new ConeGeometry( 0.35, 1, 16 );
    var material = new MeshPhongMaterial( {color: 0xffff00} );
    let pieceMesh = new Mesh( geometry, material );
    pieceMesh.rotateX(Utilities.degreesToRadians(90));
    pieceMesh.translateY(0.625);

    return pieceMesh;
  }

  private LoadSTL(url: string, callback: (x: Object3D) => void): void {
    new STLLoader().load(
      url, 
      function ( geometry ) {
        var material = new MeshPhongMaterial( { color: 0xFFFFFF, specular: 0x111111, shininess: 200 } );
        var mesh = new Mesh( geometry, material );
        mesh.position.set( 0, 0, 0);
        
        callback(mesh);
    });
  }
}

export default ChessPieceGeometryFactory;
