import BoardPieceType from './enums/BoardPieceType';
import Utilities from '../business/Utilities';

import { v4 as uuidv4 } from 'uuid';
import { Object3D, Mesh, ConeGeometry, MeshPhongMaterial } from 'three';

class BoardPiece {
  public readonly id = uuidv4();
  public readonly team: string;
  public readonly type: BoardPieceType;
  private pieceMesh: Mesh;

  constructor(team: string, type: BoardPieceType, pieceMesh: Mesh) {
  	this.team = team;
    this.type = type;
    this.pieceMesh = pieceMesh;
  }

  public getRenderablePiece(): Object3D {
    return this.pieceMesh;
  }
}

export default BoardPiece;
