import BoardPiece from '../models/BoardPiece';
import BoardPieceType from '../models/enums/BoardPieceType';

interface BoardPieceFactory {
  createBoardPiece(team: string, type: BoardPieceType): BoardPiece;
}

export default BoardPieceFactory;