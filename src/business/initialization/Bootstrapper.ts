import BoardGameScene from '../../presentation/BoardGameScene';
import ChessMediator from '../chess/ChessMediator';
import ChessPieceFactory from '../chess/ChessPieceFactory';
import ChessBoardBuilder from '../chess/ChessBoardBuilder';
import BoardBuilder from '../BoardBuilder';
import BoardPieceFactory from '../BoardPieceFactory';
import GameType from '../../models/enums/GameType';
import GameMediator from '../GameMediator';
import ChessPieceGeometryFactory from '../chess/ChessPieceGeometryFactory';
import BoardPieceGeometryFactory from '../BoardPieceGeometryFactory';
import ChessPieceMovementJudgeFactory from '../chess/ChessPieceMovementJudgeFactory';
import PieceMovementJudgeFactory from '../PieceMovementJudgeFactory';
import MovementJudge from '../MovementJudge';
import ChessMovementJudge from '../chess/movementJudges/ChessMovementJudge';
import GameStateProcessor from '../GameStateProcessor';
import ChessStateProcessor from '../chess/ChessStateProcessor';

import { Container } from "inversify";
import { IOCTypes } from "./IOCTypes";
import { interfaces } from "inversify";

class Bootstrapper {
  private static instance: Bootstrapper | null = null;

  private container: Container;

  private constructor() {
    this.container = new Container();

    this.container.bind<BoardGameScene>(IOCTypes.BoardGameScene).to(BoardGameScene);

    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(ChessMovementJudge).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<MovementJudge>>(IOCTypes.MovementJudgeFactory)
                  .toFactory((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<MovementJudge>(IOCTypes.MovementJudge, type);
                    };
                  });

    this.container.bind<PieceMovementJudgeFactory>(IOCTypes.PieceMovementJudgeFactory).to(ChessPieceMovementJudgeFactory).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<PieceMovementJudgeFactory>>(IOCTypes.AbstractPieceMovementJudgeFactory)
                  .toFactory<PieceMovementJudgeFactory>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<PieceMovementJudgeFactory>(IOCTypes.PieceMovementJudgeFactory, type);
                    };
                  });

    this.container.bind<BoardPieceGeometryFactory>(IOCTypes.BoardPieceGeometryFactory).to(ChessPieceGeometryFactory).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<BoardPieceGeometryFactory>>(IOCTypes.AbstractBoardPieceGeometryFactory)
                  .toFactory<BoardPieceGeometryFactory>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<BoardPieceGeometryFactory>(IOCTypes.BoardPieceGeometryFactory, type);
                    };
                  });

    this.container.bind<GameMediator>(IOCTypes.GameMediator).to(ChessMediator).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<GameMediator>>(IOCTypes.GameMediatorFactory)
                  .toFactory<GameMediator>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<GameMediator>(IOCTypes.GameMediator, type);
                    };
                  });

    this.container.bind<BoardBuilder>(IOCTypes.BoardBuilder).to(ChessBoardBuilder).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<BoardBuilder>>(IOCTypes.BoardBuilderFactory)
                  .toFactory<BoardBuilder>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<BoardBuilder>(IOCTypes.BoardBuilder, type);
                    };
                  });

    this.container.bind<BoardPieceFactory>(IOCTypes.BoardPieceFactory).to(ChessPieceFactory).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<BoardPieceFactory>>(IOCTypes.AbstractBoardPieceFactory)
                  .toFactory<BoardPieceFactory>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<BoardPieceFactory>(IOCTypes.BoardPieceFactory, type);
                    };
                  });

    this.container.bind<GameStateProcessor>(IOCTypes.GameStateProcessor).to(ChessStateProcessor).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<GameStateProcessor>>(IOCTypes.GameStateProcessorFactory)
                  .toFactory<GameStateProcessor>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<GameStateProcessor>(IOCTypes.GameStateProcessor, type);
                    };
                  });
  }

  public static getContainer() {
    if (Bootstrapper.instance === null) {
      Bootstrapper.instance = new Bootstrapper();
    }

    return Bootstrapper.instance.container;
  }
}

export default Bootstrapper;