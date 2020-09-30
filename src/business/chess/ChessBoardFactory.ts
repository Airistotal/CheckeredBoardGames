import BoardFactory from '../BoardFactory';
import GameType from '../../models/enums/GameType';
import Board from '../../models/Board';

class ChessBoardFactory implements BoardFactory {
	public createBoard(type: GameType): Board {
		switch(type) {
			case GameType.Chess: {
				let board = new Board(8, 8);


				return board;
			}
			default: {
				throw new Error("Game type not supported");
			}
		}
	}

	public static placePieces(board: Board) {

	}
}

export default ChessBoardFactory;
