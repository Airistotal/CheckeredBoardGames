import { PerspectiveCamera, Scene, FogExp2, BoxGeometry, MeshPhongMaterial, Mesh, DirectionalLight } from 'three';

class BoardGameScene {
  public readonly scene: Scene;
  public readonly camera: PerspectiveCamera;
  private cube: Mesh = new Mesh();
  private light: DirectionalLight | null = null;

  constructor() {
    let aspect = window.innerWidth / window.innerHeight;
    this.camera = new PerspectiveCamera(75, aspect, 0.1, 1000);
    this.scene = new Scene();

    this.scene.add(this.camera);
    this.camera.position.z = 2;

    this.scene.fog = new FogExp2(0xefd1b5, 0.0025);

    this.addBox();
    this.addLight();
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

  private addLight() {
    let color = 0xFFFFFF;
    let intensity = 1;
    this.light = new DirectionalLight(color, intensity);
    this.light.position.set(-1, 2, 4);

    this.scene.add(this.light);
  }

  public animate(time: number) {
    this.cube.rotation.x = time;
    this.cube.rotation.y = time;
  }
}

export default BoardGameScene;