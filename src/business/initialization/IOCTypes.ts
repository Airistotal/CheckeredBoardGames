const IOCTypes = {
  BoardBuilderFactory: Symbol.for("BoardBuilderFactory"),
  PieceMovementJudgeFactory: Symbol.for("PieceMovementJudgeFactory"),
  AbstractPieceMovementJudgeFactory: Symbol.for("AbstractPieceMovementJudgeFactory"),
  MovementJudgeFactory: Symbol.for("MovementJudgeFactory"),
  GameMediatorFactory: Symbol.for("GameMediatorFactory"),
  BoardGameScene: Symbol.for("BoardGameScene"),
  BoardPieceGeometryFactory: Symbol.for("BoardPieceGeometryFactory"),
  ChessBoardBuilder: Symbol.for("ChessBoardBuilder"),
  BoardPieceFactory: Symbol.for("BoardPieceFactory"),
  AbstractBoardPieceFactory: Symbol.for("AbstractBoardPieceFactory"),
  AbstractBoardPieceGeometryFactory: Symbol.for("AbstractBoardPieceGeometryFactory")
};

export { IOCTypes };