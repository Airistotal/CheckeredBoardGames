import { BoardGameScene } from './BoardGameScene';
import { BoardGameControls } from './BoardGameControls';
import { Scene, WebGLRenderer, Raycaster } from 'three';
import { GameMediator } from '../business/GameMediator';
import { GameType } from '../models/enums/GameType';
import { BoardCoordinate } from '../models/BoardCoordinate';
import { Board } from '../models/Board';
import { Bootstrapper } from '../business/initialization/Bootstrapper';

import { Color } from 'three';

import { IOCTypes } from '../business/initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class SceneMediator {
  private static instance: SceneMediator | null = null;
  private boardGameScene: BoardGameScene;
  private renderer: WebGLRenderer = new WebGLRenderer({antialias: true});
  private gameMediator!: GameMediator;
  private lastClicked: BoardCoordinate | null = null;

  private constructor(@inject(IOCTypes.BoardGameScene) boardGameScene: BoardGameScene,
                      @inject(IOCTypes.GameMediatorFactory) gameMediatorFactory: (type: GameType) => GameMediator) {
    this.boardGameScene = boardGameScene;

    this.gameMediator = gameMediatorFactory(GameType.Chess);
    let boardLoadPromise = this.gameMediator.loadBoard();
    boardLoadPromise.then((board: Board) =>{
      this.boardGameScene.addGroup(board.getRenderableBoard());
    });

    BoardGameControls.getInstance().addRaycasterMouseControl(this.boardGameScene.camera, this.boardGameScene.scene);
    BoardGameControls.getInstance().setOnClickCallback(SceneMediator.sendMoveCommand);
    //BoardGameControls.getInstance().addOrbitControls(this.boardGameScene.camera, this.renderer.domElement);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new Color().setHex(0xb3b3b3));
    document.body.appendChild(this.renderer.domElement);
  }

  public static getInstance(): SceneMediator {
    if(SceneMediator.instance === null) {
      const boardGameScene = Bootstrapper.getContainer().get<BoardGameScene>(IOCTypes.BoardGameScene);
      const gameMediatorFactory = Bootstrapper.getContainer().get<(type: GameType) => GameMediator>(IOCTypes.GameMediatorFactory);

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
      if (self.gameMediator.lookAtBoard().get(clicked) !== undefined) {
        self.lastClicked = clicked;
      }
    } else {
      let moveResult = self.gameMediator.move(self.lastClicked, clicked);
      !moveResult ? self.lastClicked = clicked : self.lastClicked = null;
      let winner = self.gameMediator.getTeamThatWon();

      if (winner !== undefined) {
        alert(`Game Over! Congrats ${winner.toString()}!`);
      }
    }
  }
}