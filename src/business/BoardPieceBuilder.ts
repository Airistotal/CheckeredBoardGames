import BoardPiece from '../models/BoardPiece';
import BoardPieceType from '../models/enums/BoardPieceType';
import Team from '../models/enums/Team';

interface BoardPieceBuilder {
  createBoardPiece(team: Team, type: BoardPieceType): Promise<BoardPiece>;
}

export default BoardPieceBuilder;