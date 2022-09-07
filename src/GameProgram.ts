class GameProgram {
	private gameMediator: GameMediator;
  private boardGameScene: BoardGameScene;

  constructor(@inject(IOCTypes.BoardGameScene) boardGameScene: BoardGameScene,
  						@inject(IOCTypes.GameMediatorFactory) gameMediatorFactory: (type: GameType) => GameMediator) {
  	this.boardGameScene = boardGameScene;
  }
}
