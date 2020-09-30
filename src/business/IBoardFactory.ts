import GameType from '../models/enums/GameType';
import Board from '../models/Board';

interface IBoardFactory {
	createBoard(type: GameType): Board;
}

export default IBoardFactory;
