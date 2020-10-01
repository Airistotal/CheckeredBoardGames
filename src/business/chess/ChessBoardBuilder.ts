import BoardBuilder from '../BoardBuilder';
import GameType from '../../models/enums/GameType';
import BoardPieceType from '../../models/enums/BoardPieceType';
import Board from '../../models/Board';
import BoardCoordinate from '../../models/BoardCoordinate';
import BoardPiece from '../../models/BoardPiece';

class ChessBoardBuilder implements BoardBuilder {
	public createBoard(): Board {
		let board = new Board(8, 8);
		this.placePieces(board);

		return board;
	}

	private placePieces(board: Board): void {
		this.placeWhitePieces(board);
		this.placeBlackPieces(board);
	}

	private placeWhitePieces(board: Board): void {
		board.get(BoardCoordinate.at(1, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Rook));
		board.get(BoardCoordinate.at(2, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(3, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(4, 1)).SetPiece(new BoardPiece("white", BoardPieceType.King));
		board.get(BoardCoordinate.at(5, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Queen));
		board.get(BoardCoordinate.at(6, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(7, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(8, 1)).SetPiece(new BoardPiece("white", BoardPieceType.Rook));

		for (var i = 0; i < 8; i++) {
			board.get(BoardCoordinate.at(i + 1, 2)).SetPiece(new BoardPiece("white", BoardPieceType.Pawn));
		}
	}

	private placeBlackPieces(board: Board): void {
		board.get(BoardCoordinate.at(1, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Rook));
		board.get(BoardCoordinate.at(2, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(3, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(4, 8)).SetPiece(new BoardPiece("black", BoardPieceType.King));
		board.get(BoardCoordinate.at(5, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Queen));
		board.get(BoardCoordinate.at(6, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(7, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(8, 8)).SetPiece(new BoardPiece("black", BoardPieceType.Rook));

		for (var i = 0; i < 8; i++) {
			board.get(BoardCoordinate.at(i + 1, 7)).SetPiece(new BoardPiece("black", BoardPieceType.Pawn));
		}
	}
}

export default ChessBoardBuilder;
