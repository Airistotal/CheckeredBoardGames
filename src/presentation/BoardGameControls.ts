import { Vector2 } from 'three';

class BoardGameControls {
  public readonly mouse: Vector2

  constructor(rendererDomElement: HTMLCanvasElement, ) {
    this.mouse = new Vector2(0, 0);
  }

  attachMouseToWindow() {
    window.addEventListener('mousemove', this.onMouseMove, false);
  }

  private onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }
}

export default BoardGameControls;