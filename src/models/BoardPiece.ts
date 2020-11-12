import BoardPieceType from './enums/BoardPieceType';
import Utilities from '../business/Utilities';
import Team from '../../src/models/enums/Team';

import { v4 as uuidv4 } from 'uuid';
import { Object3D, Mesh, ConeGeometry, MeshPhongMaterial } from 'three';

class BoardPiece {
  public readonly id = uuidv4();
  public readonly team: Team;
  public readonly type: BoardPieceType;
  private pieceMesh: Object3D;

  constructor(team: Team, type: BoardPieceType, pieceMesh: Object3D) {
  	this.team = team;
    this.type = type;
    this.pieceMesh = pieceMesh;

    this.setTeamSpecifics();
  }

  public getRenderablePiece(): Object3D {
    return this.pieceMesh;
  }
  
  public setRenderablePiece(piece: Object3D) {
    this.pieceMesh = piece;

    this.setTeamSpecifics();
  }

  private setTeamSpecifics() {
    (<MeshPhongMaterial>(<Mesh>this.pieceMesh).material).color.set(this.team);

    if (this.type === BoardPieceType.Knight && this.team === Team.White) {
      this.pieceMesh.rotateY(Utilities.degreesToRadians(180));
      this.pieceMesh.position.set(0, 0, 0);
      this.pieceMesh.translateY(0.4);
      this.pieceMesh.translateX(-0.35);
      this.pieceMesh.translateZ(-0.4);
    }
  }
}

export default BoardPiece;
