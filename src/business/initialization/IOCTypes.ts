const IOCTypes = {
  BoardBuilderFactory: Symbol.for("BoardBuilderFactory"),
  PieceMovementJudgeFactory: Symbol.for("PieceMovementJudgeFactory"),
  AbstractPieceMovementJudgeFactory: Symbol.for("AbstractPieceMovementJudgeFactory"),
  MovementJudgeFactory: Symbol.for("MovementJudgeFactory"),
  GameMediatorFactory: Symbol.for("GameMediatorFactory"),
  BoardGameScene: Symbol.for("BoardGameScene"),
  BoardPieceGeometryFactory: Symbol.for("BoardPieceGeometryFactory"),
  BoardPieceFactory: Symbol.for("BoardPieceFactory"),
  AbstractBoardPieceFactory: Symbol.for("AbstractBoardPieceFactory"),
  AbstractBoardPieceGeometryFactory: Symbol.for("AbstractBoardPieceGeometryFactory"),
  ChessMediator: Symbol.for("ChessMediator"),
  ChessPieceFactory: Symbol.for("ChessPieceFactory"),
  BoardBuilder: Symbol.for("BoardBuilder"),
  GameMediator: Symbol.for("GameMediator"),
  MovementJudge: Symbol.for("MovementJudge")
};

export { IOCTypes };