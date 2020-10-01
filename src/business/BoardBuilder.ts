import GameType from '../models/enums/GameType';
import Board from '../models/Board';

interface BoardBuilder {
	createBoard(): Board;
}

export default BoardBuilder;
