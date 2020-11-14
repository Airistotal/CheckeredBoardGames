import { SceneMediator } from './presentation/SceneMediator';

class Main {
  public static Run() {
    const renderer = SceneMediator.getInstance();

    renderer.render(Date.now());

    requestAnimationFrame(SceneMediator.render);
  }
}

Main.Run();