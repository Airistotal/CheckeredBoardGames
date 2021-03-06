import { BoardGameScene } from '../../presentation/BoardGameScene';
import { ChessMediator } from '../chess/ChessMediator';
import { ChessPieceBuilder } from '../chess/ChessPieceBuilder';
import { ChessBoardBuilder } from '../chess/ChessBoardBuilder';
import { BoardBuilder } from '../BoardBuilder';
import { BoardPieceBuilder } from '../BoardPieceBuilder';
import { GameType } from '../../models/enums/GameType';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { MovementJudgeType } from '../../models/enums/MovementJudgeType';
import { GameMediator } from '../GameMediator';
import { ChessPieceGeometryBuilder } from '../chess/ChessPieceGeometryBuilder';
import { ChessPromotionBoxBuilder } from '../chess/ChessPromotionBoxBuilder';
import { PromotionBoxBuilder } from '../PromotionBoxBuilder';
import { BoardPieceGeometryBuilder } from '../BoardPieceGeometryBuilder';
import { MovementJudge } from '../MovementJudge';
import { FluentMovementDataBuilder } from '../FluentMovementDataBuilder';
import { ChessMovementJudge } from '../chess/movementJudges/ChessMovementJudge';
import { GameStateProcessor } from '../GameStateProcessor';
import { ChessStateProcessor } from '../chess/ChessStateProcessor';
import { BishopMovementJudge } from '../chess/movementJudges/BishopMovementJudge';
import { KnightMovementJudge} from '../chess/movementJudges/KnightMovementJudge';
import { KingMovementJudge } from '../chess/movementJudges/KingMovementJudge';
import { QueenMovementJudge } from '../chess/movementJudges/QueenMovementJudge';
import { RookMovementJudge } from '../chess/movementJudges/RookMovementJudge';
import { PawnMovementJudge } from '../chess/movementJudges/PawnMovementJudge';
import { CheckMovementJudge } from '../chess/movementJudges/CheckMovementJudge';
import { UiController } from '../../presentation/UiController';

import { Container } from "inversify";
import { IOCTypes } from "./IOCTypes";
import { interfaces } from "inversify";

export class Bootstrapper {
  private static instance: Bootstrapper | null = null;

  private container: Container;

  private constructor() {
    this.container = new Container();

    this.container.bind<BoardGameScene>(IOCTypes.BoardGameScene).to(BoardGameScene);
    this.container.bind<UiController>(IOCTypes.UiController).to(UiController);

    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(ChessMovementJudge).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<MovementJudge>>(IOCTypes.MovementJudgeFactory)
                  .toFactory((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<MovementJudge>(IOCTypes.MovementJudge, type);
                    };
                  });

    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(KingMovementJudge).whenTargetNamed(`${MovementJudgeType.King}${GameType.Chess}`);
    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(QueenMovementJudge).whenTargetNamed(`${MovementJudgeType.Queen}${GameType.Chess}`);
    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(BishopMovementJudge).whenTargetNamed(`${MovementJudgeType.Bishop}${GameType.Chess}`);
    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(KnightMovementJudge).whenTargetNamed(`${MovementJudgeType.Knight}${GameType.Chess}`);
    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(RookMovementJudge).whenTargetNamed(`${MovementJudgeType.Rook}${GameType.Chess}`);
    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(PawnMovementJudge).whenTargetNamed(`${MovementJudgeType.Pawn}${GameType.Chess}`);
    this.container.bind<MovementJudge>(IOCTypes.MovementJudge).to(CheckMovementJudge).whenTargetNamed(`${MovementJudgeType.Check}${GameType.Chess}`);
    this.container.bind<interfaces.Factory<MovementJudge>>(IOCTypes.PieceMovementJudgeFactory)
                  .toFactory<MovementJudge>((context) => {
                    return (type: MovementJudgeType) => {
                      return context.container.getNamed<MovementJudge>(IOCTypes.MovementJudge, `${type}${GameType.Chess}`);
                    };
                  })
                  .whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<interfaces.Factory<MovementJudge>>>(IOCTypes.AbstractPieceMovementJudgeFactory)
                  .toFactory<interfaces.Factory<MovementJudge>>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<interfaces.Factory<MovementJudge>>(IOCTypes.PieceMovementJudgeFactory, type);
                    };
                  });

    this.container.bind<BoardPieceGeometryBuilder>(IOCTypes.BoardPieceGeometryBuilder).to(ChessPieceGeometryBuilder).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<BoardPieceGeometryBuilder>>(IOCTypes.BoardPieceGeometryBuilderFactory)
                  .toFactory<BoardPieceGeometryBuilder>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<BoardPieceGeometryBuilder>(IOCTypes.BoardPieceGeometryBuilder, type);
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

    this.container.bind<BoardPieceBuilder>(IOCTypes.BoardPieceBuilder).to(ChessPieceBuilder).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<BoardPieceBuilder>>(IOCTypes.BoardPieceBuilderFactory)
                  .toFactory<BoardPieceBuilder>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<BoardPieceBuilder>(IOCTypes.BoardPieceBuilder, type);
                    };
                  });

    this.container.bind<GameStateProcessor>(IOCTypes.GameStateProcessor).to(ChessStateProcessor).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<GameStateProcessor>>(IOCTypes.GameStateProcessorFactory)
                  .toFactory<GameStateProcessor>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<GameStateProcessor>(IOCTypes.GameStateProcessor, type);
                    };
                  });

    this.container.bind<PromotionBoxBuilder>(IOCTypes.PromotionBoxBuilder).to(ChessPromotionBoxBuilder).whenTargetNamed(GameType.Chess);
    this.container.bind<interfaces.Factory<PromotionBoxBuilder>>(IOCTypes.PromotionBoxBuilderFactory)
                  .toFactory<PromotionBoxBuilder>((context) => {
                    return (type: GameType) => {
                      return context.container.getNamed<PromotionBoxBuilder>(IOCTypes.PromotionBoxBuilder, type);
                    }
                  });
  }

  public static getContainer() {
    if (Bootstrapper.instance === null) {
      Bootstrapper.instance = new Bootstrapper();
    }

    return Bootstrapper.instance.container;
  }
}