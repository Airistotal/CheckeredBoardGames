import WebGlSceneRenderer from './presentation/WebGlSceneRenderer';

class Main {
  public static Run() {
    const renderer = WebGlSceneRenderer.getInstance();

    renderer.render(Date.now());

    requestAnimationFrame(WebGlSceneRenderer.render);
  }
}

Main.Run();