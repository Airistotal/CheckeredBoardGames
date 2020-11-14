import { Utilities } from '../business/Utilities';

import { PerspectiveCamera, Scene, FogExp2, BoxGeometry, MeshPhongMaterial, Mesh, DirectionalLight, Group } from 'three';

import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class BoardGameScene {
  public readonly scene: Scene = new Scene();
  public readonly camera: PerspectiveCamera;
  private cube: Mesh = new Mesh();
  private light!: DirectionalLight;
  private crossLight!: DirectionalLight;

  constructor() {
    this.scene.fog = new FogExp2(0xefd1b5, 0.0025);
    let aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(55, aspect, 0.1, 1000);

    this.addLights();
    this.addCamera();
  }

  public animate(time: number) {
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
  }

  private addLights() {
    let color = 0xFFFFFF;
    let intensity = 1;
    this.light = new DirectionalLight(color, intensity);
    this.light.position.set(-1, 2, 4);

    this.crossLight = new DirectionalLight(color, intensity);
    this.crossLight.position.set(3, -4, 4);

    this.scene.add(this.light);
    this.scene.add(this.crossLight);
  }

  private addCamera(): void {
    this.camera.position.z = 7;
    this.camera.position.x = 4.5;
    this.camera.position.y = -1;
    this.camera.rotateX(Utilities.degreesToRadians(35));
    this.scene.add(this.camera);
  }

  public addGroup(group: Group) {
    this.scene.add(group);
  }
}