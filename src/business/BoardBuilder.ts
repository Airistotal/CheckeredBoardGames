import { GameType } from '../models/enums/GameType';
import { Board } from '../models/Board';

export interface BoardBuilder {
	createBoard(): Promise<Board>;
}