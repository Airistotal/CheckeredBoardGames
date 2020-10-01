import BoardPieceType from './enums/BoardPieceType';
import Utilities from '../business/Utilities';

import { v4 as uuidv4 } from 'uuid';
import { Object3D, Mesh, ConeGeometry, MeshPhongMaterial } from 'three';

class BoardPiece {
  public readonly team: string;
  public readonly type: BoardPieceType;
  public readonly id = uuidv4();
  private pieceMesh!: Mesh;

  constructor(team: string, type: BoardPieceType) {
  	this.team = team;
    this.type = type;

    this.createPieceMesh(type);
  }

  public createPieceMesh(type: BoardPieceType) {
    var geometry = new ConeGeometry( 0.35, 1, 16 );
    var material = new MeshPhongMaterial( {color: 0xffff00} );
    this.pieceMesh = new Mesh( geometry, material );
    this.pieceMesh.rotateX(Utilities.degreesToRadians(90));
  }

  public getRenderablePiece(): Object3D {
    return this.pieceMesh;
  }
}

export default BoardPiece;
