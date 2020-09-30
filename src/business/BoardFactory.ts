import GameType from '../models/enums/GameType';
import Board from '../models/Board';

interface BoardFactory {
	createBoard(type: GameType): Board;
}

export default BoardFactory;
