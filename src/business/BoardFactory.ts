import IBoardFactory from './IBoardFactory';
import GameType from '../models/enums/GameType';
import Board from '../models/Board';

class BoardFactory implements IBoardFactory {
	public createBoard(type: GameType): Board {
		switch(type) {
			case GameType.Chess: {
				return new Board(8, 8);
			}
			default: {
				throw new Error("Game type not supported");
			}
		}
	}
}

export default BoardFactory;
