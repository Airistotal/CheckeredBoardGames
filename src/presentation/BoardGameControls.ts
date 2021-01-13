import { BoardCoordinate } from '../models/BoardCoordinate';
import { SceneLayer } from '../models/enums/SceneLayer';

import * as $ from 'jquery';
import { Vector2, Raycaster, PerspectiveCamera, Scene, Intersection } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class BoardGameControls {
  private static instance: BoardGameControls | null = null;
  private raycaster: Raycaster;
  private camera!: PerspectiveCamera;
  private scene!: Scene;
  private orbitControls!: OrbitControls;
  private onClickCallback!: (x: Intersection[]) => void;

  private constructor() {
    this.raycaster = new Raycaster();
    this.raycaster.layers.set(1);
  }

  public static getInstance(): BoardGameControls {
    if (BoardGameControls.instance === null) {
      BoardGameControls.instance = new BoardGameControls();
    }

    return BoardGameControls.instance;
  }

  public addOrbitControls(camera: PerspectiveCamera, elem: HTMLElement) {
    this.orbitControls = new OrbitControls(camera, elem);
  }

  public addRaycasterMouseControl(camera: PerspectiveCamera, scene: Scene): void {
    this.camera = camera;
    this.scene = scene;

    $('body').on('click', this.onMouseClick);
  }

  public setOnClickCallback(callback: (x: Intersection[]) => void) {
    this.onClickCallback = callback;
  }

  public setClickLayer(layer: SceneLayer) {
    this.raycaster.layers.set(layer);
  }

  private onMouseClick(event: any): void {
    event.preventDefault();

    let ctrls = BoardGameControls.getInstance();
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = - (event.clientY / window.innerHeight) * 2 + 1;

    ctrls.raycaster.setFromCamera({x, y}, ctrls.camera);

    ctrls.onClickCallback(ctrls.raycaster.intersectObjects(ctrls.scene.children, true));
  }
}