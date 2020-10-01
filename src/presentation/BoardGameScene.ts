import GameMediator from '../business/GameMediator';
import ChessMediator from '../business/chess/ChessMediator';
import ChessBoardBuilder from '../business/chess/ChessBoardBuilder';
import ChessMovementJudge from '../business/chess/movementJudges/ChessMovementJudge';
import ChessPieceMovementJudgeFactory from '../business/chess/ChessPieceMovementJudgeFactory';
import Utilities from '../business/Utilities';

import { PerspectiveCamera, Scene, FogExp2, BoxGeometry, MeshPhongMaterial, Mesh, DirectionalLight } from 'three';

class BoardGameScene {
  public readonly scene: Scene = new Scene();
  public readonly camera: PerspectiveCamera;
  private cube: Mesh = new Mesh();
  private light: DirectionalLight | null = null;
  private gameMediator: GameMediator | null = null;

  constructor() {
    this.scene.fog = new FogExp2(0xefd1b5, 0.0025);
    let aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(55, aspect, 0.1, 1000);

    this.addLight();
    this.addCamera();
    this.addGame();
  }

  public animate(time: number) {
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
  }

  private addLight() {
    let color = 0xFFFFFF;
    let intensity = 1;
    this.light = new DirectionalLight(color, intensity);
    this.light.position.set(-1, 2, 4);

    this.scene.add(this.light);
  }

  private addCamera(): void {
    this.camera.position.z = 7;
    this.camera.position.x = 4;
    this.camera.position.y = -1;
    this.camera.rotateX(Utilities.degreesToRadians(35));
    this.scene.add(this.camera);
  }

  private addGame():void {
    this.gameMediator = new ChessMediator(
      new ChessBoardBuilder(),
      new ChessMovementJudge(
        new ChessPieceMovementJudgeFactory()));

    this.scene.add(this.gameMediator.lookAtBoard().getRenderableBoard());
  }

  private addBox() {
    let boxWidth = 1;
    let boxHeight = 1;
    let boxDepth = 1;
    let geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
    let material = new MeshPhongMaterial({color: 0x44aa88});
    this.cube = new Mesh(geometry, material);

    this.scene.add(this.cube);
  }
}

export default BoardGameScene;