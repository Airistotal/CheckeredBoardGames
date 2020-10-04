import BoardGameScene from './BoardGameScene';
import BoardGameControls from './BoardGameControls';
import { Scene, WebGLRenderer, Raycaster } from 'three';
import IGameMediatorFactory from '../business/IGameMediatorFactory';
import GameMediator from '../business/GameMediator';
import GameType from '../models/enums/GameType';
import BoardCoordinate from '../models/BoardCoordinate';
import Bootstrapper from '../business/initialization/Bootstrapper';

import { IOCTypes } from '../business/initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class SceneMediator {
  private static instance: SceneMediator | null = null;
  private boardGameScene: BoardGameScene;
  private renderer: WebGLRenderer = new WebGLRenderer();
  private gameMediator!: GameMediator;
  private lastClicked: BoardCoordinate | null = null;

  private constructor(@inject(IOCTypes.BoardGameScene) boardGameScene: BoardGameScene,
                      @inject(IOCTypes.GameMediatorFactory) gameMediatorFactory: IGameMediatorFactory) {
    this.boardGameScene = boardGameScene;

    this.gameMediator = gameMediatorFactory.createGameMediator(GameType.Chess);
    this.boardGameScene.addGroup(this.gameMediator.lookAtBoard().getRenderableBoard());

    BoardGameControls.getInstance().addRaycasterMouseControl(this.boardGameScene.camera, this.boardGameScene.scene);
    BoardGameControls.getInstance().setOnClickCallback(SceneMediator.sendMoveCommand);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  public static getInstance(): SceneMediator {
    if(SceneMediator.instance === null) {
      const boardGameScene = Bootstrapper.getContainer().get<BoardGameScene>(IOCTypes.BoardGameScene);
      const gameMediatorFactory = Bootstrapper.getContainer().get<IGameMediatorFactory>(IOCTypes.GameMediatorFactory);

      SceneMediator.instance = new SceneMediator(boardGameScene, gameMediatorFactory);
    }

    return SceneMediator.instance;
  }

  public static render(time: number) {
    time *= 0.001;

    SceneMediator.getInstance().render(time);

    requestAnimationFrame(SceneMediator.render);
  }

  public render(time: number) {
    this.boardGameScene.animate(time);
    this.renderer.render(this.boardGameScene.scene, this.boardGameScene.camera);
  }

  public static sendMoveCommand(clicked: BoardCoordinate): void {
    let self = SceneMediator.getInstance();

    if (self.lastClicked === null) {
      if (self.gameMediator.lookAtBoard().get(clicked).getPiece() !== undefined) {
        self.lastClicked = clicked;
      }
    } else {
      self.gameMediator.move(self.lastClicked, clicked);
      self.lastClicked = null;
    }
  }
}

export default SceneMediator;