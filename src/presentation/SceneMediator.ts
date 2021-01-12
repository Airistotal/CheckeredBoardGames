import { BoardGameScene } from './BoardGameScene';
import { BoardGameControls } from './BoardGameControls';
import { Scene, WebGLRenderer, Raycaster } from 'three';
import { GameMediator } from '../business/GameMediator';
import { GameType } from '../models/enums/GameType';
import { GameState } from '../models/enums/GameState';
import { Team } from '../models/enums/Team';
import { BoardCoordinate } from '../models/BoardCoordinate';
import { Board } from '../models/Board';
import { Bootstrapper } from '../business/initialization/Bootstrapper';
import { Utilities } from '../business/Utilities';

import { Color, Group, Object3D, Intersection } from 'three';

import { IOCTypes } from '../business/initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class SceneMediator {
  private static instance: SceneMediator | null = null;
  private boardGameScene: BoardGameScene;
  private renderer: WebGLRenderer = new WebGLRenderer({antialias: true});
  private gameMediator!: GameMediator;
  private gameState: GameState = GameState.Movement;
  private lastClicked: BoardCoordinate | null = null;

  private constructor(@inject(IOCTypes.BoardGameScene) boardGameScene: BoardGameScene,
                      @inject(IOCTypes.GameMediatorFactory) gameMediatorFactory: (type: GameType) => GameMediator) {
    this.boardGameScene = boardGameScene;

    this.gameMediator = gameMediatorFactory(GameType.Chess);
    let gameLoadPromise = this.gameMediator.loadGame();
    gameLoadPromise.then((game: Group) =>{
      this.boardGameScene.addGroup(game);
    });

    BoardGameControls.getInstance().addRaycasterMouseControl(this.boardGameScene.camera, this.boardGameScene.scene);
    BoardGameControls.getInstance().setOnClickCallback(SceneMediator.sendCommand);
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

  public static sendCommand(clicked: Intersection[]): void {
    if (clicked === undefined || clicked[0] === undefined) return;

    let self = SceneMediator.getInstance();

    switch (self.gameState) {
      case GameState.Movement:
        let tile = clicked[0].object;
        if (tile === null || tile.parent === null) { return; }

        let coordinate = <BoardCoordinate>tile.parent.userData;

        self.sendMoveCommand(coordinate);
        break;

      case GameState.Promotion:
        self.sendPromotionCommand();
        break;
      
      default:
        break;
    }

    self.changeStateIfRequired();
  }

  public sendMoveCommand(clicked: BoardCoordinate): void {
    if (this.lastClicked === null) {
      if (this.gameMediator.lookAtBoard().get(clicked) !== undefined) {
        this.lastClicked = clicked;
      }
    } else {
      let moveResult = this.gameMediator.move(this.lastClicked, clicked);
      !moveResult ? this.lastClicked = clicked : this.lastClicked = null;
    }
  }

  public sendPromotionCommand(): void {
    this.gameState = GameState.Movement;
  }

  public changeStateIfRequired() {
    let winner = this.gameMediator.getTeamThatWon();

    if (winner !== undefined) {
      alert(`Game Over! Congrats ${winner === Team.White ? 'White' : 'Black'}!`);
      this.gameState = GameState.GameOver;
    }

    let promotionBox = this.gameMediator.getPromotionBox();
    if (promotionBox !== undefined) {
      this.gameState = GameState.Promotion;

      promotionBox.position.x = -1.5;
      promotionBox.position.y = -1;
      promotionBox.position.z = -4.5;
      promotionBox.renderOrder = 9999;
      promotionBox.rotateX(Utilities.degreesToRadians(270));

      this.boardGameScene.camera.add(promotionBox);
    }
  }
}