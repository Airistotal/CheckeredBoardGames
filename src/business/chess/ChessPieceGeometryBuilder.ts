import BoardPieceGeometryBuilder from '../BoardPieceGeometryBuilder';
import BoardPieceType from '../../models/enums/BoardPieceType';
import Utilities from '../Utilities';

import { Mesh, ConeGeometry, MeshPhongMaterial, Object3D, Vector3, Box3 } from 'three';

import { STLLoader } from '../loaders/STLLoader';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessPieceGeometryBuilder implements BoardPieceGeometryBuilder {
  public createGeometryFor(type: BoardPieceType): Promise<Object3D> {
    switch (type) {
      case BoardPieceType.King:
        return this.LoadSTL('res/STL/King.stl', 1.5);
      case BoardPieceType.Queen:
        return this.LoadSTL('res/STL/Queen.stl', 1.5);
      case BoardPieceType.Rook:
        return this.LoadSTL('res/STL/Rook.stl', 1.5);
      case BoardPieceType.Bishop:
        return this.LoadSTL('res/STL/Bishop.stl', 1.5);
      case BoardPieceType.Knight:
        return this.LoadSTL('res/STL/Knight.stl', 1.2);
      case BoardPieceType.Pawn:
        return this.LoadSTL('res/STL/Pawn.stl', 1.5);
      default:
        return this.getCone();
        break;
    }
  }

  private LoadSTL(url: string, scaleDegree: number): Promise<Object3D> {
    let self = this;

    return new Promise<Object3D>((resolve, reject) => {
      new STLLoader().load(
        url, 
        function (geometry) {
          var material = new MeshPhongMaterial({ color: 0xFFFFFF, specular: 0x111111, shininess: 200 });
          var mesh = new Mesh(geometry, material);
          var size = new Vector3();
          new Box3().setFromObject(mesh).getSize(size);
          var scale = 1 / (size.z*scaleDegree);


          mesh.scale.set(scale, scale, scale);
          mesh.rotateX(Utilities.degreesToRadians(90));
          mesh.translateY(0.4);
          mesh.translateX(-0.35);
          mesh.translateZ(-0.4);

          resolve(mesh);
        },
        function (e) {},
        function (error) {
          self.getCone()
              .then((obj) => resolve(obj));
        });
    });
  }

  private getCone(): Promise<Object3D> {
    return new Promise((resolve, reject) => {
      var geometry = new ConeGeometry( 0.35, 1, 16 );
      var material = new MeshPhongMaterial( {color: 0xffff00} );
      let pieceMesh = new Mesh( geometry, material );
      pieceMesh.rotateX(Utilities.degreesToRadians(90));
      pieceMesh.translateY(0.625);

      resolve(pieceMesh);
    });
  }
}

export default ChessPieceGeometryBuilder;
