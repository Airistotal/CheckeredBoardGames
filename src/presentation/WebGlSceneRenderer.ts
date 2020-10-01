import BoardGameScene from './BoardGameScene';
import BoardGameControls from './BoardGameControls';
import { Scene, WebGLRenderer, Raycaster } from 'three';

class WebGlSceneRenderer {
  private static boardGameScene: BoardGameScene = new BoardGameScene();
  private static boardGameControls: BoardGameControls;
  private static renderer: WebGLRenderer = new WebGLRenderer();

  public static initialize() {
    WebGlSceneRenderer.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(WebGlSceneRenderer.renderer.domElement);
    WebGlSceneRenderer.boardGameControls = new BoardGameControls(WebGlSceneRenderer.renderer.domElement);
  }

  public static render(time: number) {
    time *= 0.001;

    WebGlSceneRenderer.boardGameScene.animate(time);

    WebGlSceneRenderer.renderer.render(
      WebGlSceneRenderer.boardGameScene.scene,
      WebGlSceneRenderer.boardGameScene.camera);

    requestAnimationFrame(WebGlSceneRenderer.render);
  }
}

export default WebGlSceneRenderer;