import BoardPiece from '../models/BoardPiece';

interface PieceFactory {
	createPiece(): BoardPiece
}