import BoardBuilder from '../BoardBuilder';
import GameType from '../../models/enums/GameType';
import BoardPieceType from '../../models/enums/BoardPieceType';
import Board from '../../models/Board';
import BoardCoordinate from '../../models/BoardCoordinate';
import BoardPiece from '../../models/BoardPiece';
import BoardPieceFactory from '../BoardPieceFactory';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessBoardBuilder implements BoardBuilder {
	private readonly boardPieceFactory: BoardPieceFactory;

	constructor(@inject(IOCTypes.BoardPieceFactory) boardPieceFactory: BoardPieceFactory) {
		this.boardPieceFactory = boardPieceFactory;
	}

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
		board.get(BoardCoordinate.at(1, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Rook));
		board.get(BoardCoordinate.at(2, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(3, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(4, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.King));
		board.get(BoardCoordinate.at(5, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Queen));
		board.get(BoardCoordinate.at(6, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(7, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(8, 1)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Rook));

		for (var i = 0; i < 8; i++) {
			board.get(BoardCoordinate.at(i + 1, 2)).setPiece(this.boardPieceFactory.createBoardPiece("white", BoardPieceType.Pawn));
		}
	}

	private placeBlackPieces(board: Board): void {
		board.get(BoardCoordinate.at(1, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Rook));
		board.get(BoardCoordinate.at(2, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(4, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.King));
		board.get(BoardCoordinate.at(3, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(5, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Queen));
		board.get(BoardCoordinate.at(6, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Bishop));
		board.get(BoardCoordinate.at(7, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Knight));
		board.get(BoardCoordinate.at(8, 8)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Rook));

		for (var i = 0; i < 8; i++) {
			board.get(BoardCoordinate.at(i + 1, 7)).setPiece(this.boardPieceFactory.createBoardPiece("black", BoardPieceType.Pawn));
		}
	}
}

export default ChessBoardBuilder;
