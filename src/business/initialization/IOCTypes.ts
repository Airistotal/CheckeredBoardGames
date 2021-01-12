const IOCTypes = {
  BoardBuilderFactory: Symbol.for("BoardBuilderFactory"),
  PieceMovementJudgeFactory: Symbol.for("PieceMovementJudgeFactory"),
  AbstractPieceMovementJudgeFactory: Symbol.for("AbstractPieceMovementJudgeFactory"),
  MovementJudgeFactory: Symbol.for("MovementJudgeFactory"),
  GameMediatorFactory: Symbol.for("GameMediatorFactory"),
  BoardGameScene: Symbol.for("BoardGameScene"),
  BoardPieceBuilder: Symbol.for("BoardPieceBuilder"),
  BoardPieceBuilderFactory: Symbol.for("BoardPieceBuilderFactory"),
  BoardPieceGeometryBuilder: Symbol.for("BoardPieceGeometryBuilder"),
  BoardPieceGeometryBuilderFactory: Symbol.for("BoardPieceGeometryBuilderFactory"),
  ChessMediator: Symbol.for("ChessMediator"),
  BoardBuilder: Symbol.for("BoardBuilder"),
  GameMediator: Symbol.for("GameMediator"),
  MovementJudge: Symbol.for("MovementJudge"),
  GameStateProcessor: Symbol.for("GameStateProcessor"),
  GameStateProcessorFactory: Symbol.for("GameStateProcessorFactory"),
  MovementDataBuilder: Symbol.for("MovementDataBuilder"),
  ChessPromotionBoxBuilder: Symbol.for("ChessPromotionBoxBuilder"),
  PromotionBoxBuilder: Symbol.for("PromotionBoxBuilder"),
  PromotionBoxBuilderFactory: Symbol.for("PromotionBoxBuilderFactory")
};

export { IOCTypes };