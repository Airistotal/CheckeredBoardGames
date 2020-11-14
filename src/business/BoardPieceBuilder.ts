import { BoardPiece } from '../models/BoardPiece';
import { BoardPieceType } from '../models/enums/BoardPieceType';
import { Team } from '../models/enums/Team';

export interface BoardPieceBuilder {
  createBoardPiece(team: Team, type: BoardPieceType): Promise<BoardPiece>;
}