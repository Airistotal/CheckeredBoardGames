import BoardBuilderFactory from '../BoardBuilderFactory';
import IBoardBuilderFactory from '../IBoardBuilderFactory';
import AbstractPieceMovementJudgeFactory from '../AbstractPieceMovementJudgeFactory';
import IAbstractPieceMovementJudgeFactory from '../IAbstractPieceMovementJudgeFactory';
import MovementJudgeFactory from '../MovementJudgeFactory';
import IMovementJudgeFactory from '../IMovementJudgeFactory';
import GameMediatorFactory from '../GameMediatorFactory';
import IGameMediatorFactory from '../IGameMediatorFactory';
import AbstractBoardPieceFactory from '../AbstractBoardPieceFactory';
import IAbstractBoardPieceFactory from '../IAbstractBoardPieceFactory';
import AbstractBoardPieceGeometryFactory from '../AbstractBoardPieceGeometryFactory';
import IAbstractBoardPieceGeometryFactory from '../IAbstractBoardPieceGeometryFactory';
import BoardGameScene from '../../presentation/BoardGameScene';
import { Container } from "inversify";
import { IOCTypes } from "./IOCTypes";

class Bootstrapper {
  private static instance: Bootstrapper | null = null;

  private container: Container;

  private constructor() {
    this.container = new Container();
    this.container.bind<IBoardBuilderFactory>(IOCTypes.BoardBuilderFactory).to(BoardBuilderFactory);
    this.container.bind<IAbstractPieceMovementJudgeFactory>(IOCTypes.AbstractPieceMovementJudgeFactory).to(AbstractPieceMovementJudgeFactory);
    this.container.bind<IMovementJudgeFactory>(IOCTypes.MovementJudgeFactory).to(MovementJudgeFactory);
    this.container.bind<IGameMediatorFactory>(IOCTypes.GameMediatorFactory).to(GameMediatorFactory);
    this.container.bind<BoardGameScene>(IOCTypes.BoardGameScene).to(BoardGameScene);
    this.container.bind<IAbstractBoardPieceFactory>(IOCTypes.AbstractBoardPieceFactory).to(AbstractBoardPieceFactory);
    this.container.bind<IAbstractBoardPieceGeometryFactory>(IOCTypes.AbstractBoardPieceGeometryFactory).to(AbstractBoardPieceGeometryFactory);
  }

  public static getContainer() {
    if (Bootstrapper.instance === null) {
      Bootstrapper.instance = new Bootstrapper();
    }

    return Bootstrapper.instance.container;
  }
}

export default Bootstrapper;