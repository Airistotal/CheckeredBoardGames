import WebGlSceneRenderer from './presentation/WebGlSceneRenderer';

class Main {
  public static Run() {
    WebGlSceneRenderer.initialize();
    WebGlSceneRenderer.render(Date.now());

    requestAnimationFrame(WebGlSceneRenderer.render);
  }
}

Main.Run();