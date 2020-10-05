import BoardCoordinate from '../models/BoardCoordinate';

import * as $ from 'jquery';
import { Vector2, Raycaster, PerspectiveCamera, Scene } from 'three';

class BoardGameControls {
  private static instance: BoardGameControls | null = null;
  private raycaster: Raycaster;
  private camera!: PerspectiveCamera;
  private scene!: Scene;
  private onClickCallback!: (x: BoardCoordinate) => void;

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

  public addRaycasterMouseControl(camera: PerspectiveCamera, scene: Scene): void {
    this.camera = camera;
    this.scene = scene;

    $('body').on('click', this.onMouseClick);
  }

  public setOnClickCallback(callback: (x: BoardCoordinate) => void) {
    this.onClickCallback = callback;
  }

  private onMouseClick(event: any): void {
    event.preventDefault();

    let ctrls = BoardGameControls.getInstance();
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = - (event.clientY / window.innerHeight) * 2 + 1;

    ctrls.raycaster.setFromCamera({x, y}, ctrls.camera);

    ctrls.getRaycasterIntersects();
  }

  private getRaycasterIntersects(): void {
    let intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects !== undefined && intersects[0] !== undefined) {
      let tile = intersects[0].object;
      if (tile === null || tile.parent === null) { return; }

      let coordinate = <BoardCoordinate>tile.parent.userData;

      this.onClickCallback(coordinate);
    }
  }
}

export default BoardGameControls;