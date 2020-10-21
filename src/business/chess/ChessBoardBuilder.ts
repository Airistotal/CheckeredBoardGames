import BoardBuilder from '../BoardBuilder';
import GameType from '../../models/enums/GameType';
import BoardPieceType from '../../models/enums/BoardPieceType';
import Board from '../../models/Board';
import BoardCoordinate from '../../models/BoardCoordinate';
import BoardPiece from '../../models/BoardPiece';
import BoardPieceFactory from '../BoardPieceFactory';

import { Mesh, MeshPhongMaterial } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
class ChessBoardBuilder implements BoardBuilder {
	private readonly boardPieceFactory: BoardPieceFactory;
	private board!: Board;

	constructor(@inject(IOCTypes.AbstractBoardPieceFactory) abstractFactory: (type: GameType) => BoardPieceFactory) {
		this.boardPieceFactory = abstractFactory(GameType.Chess);
	}

	public createBoard(): Promise<Board> {
		this.board = new Board(8, 8);

		return new Promise((resolve, reject) => {
			let piecePromise = this.loadPieces(this.board);
			piecePromise.then(() => {
				resolve(this.board);
			});
		});
	}

	private loadPieces(board: Board): Promise<void> {
		let self = this;

		return new Promise<void>((resolve, reject) => {
			let piecePromises = new Array<Promise<BoardPiece>>();

			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(1, 1), "white", BoardPieceType.Rook));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(2, 1), "white", BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(3, 1), "white", BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(4, 1), "white", BoardPieceType.Queen));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(5, 1), "white", BoardPieceType.King));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(6, 1), "white", BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(7, 1), "white", BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(8, 1), "white", BoardPieceType.Rook));

			for (var i = 0; i < 8; i++) {
				piecePromises.push(self.getPiecePromise(BoardCoordinate.at(i + 1, 2), "white", BoardPieceType.Pawn));
			}

			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(1, 8), "black", BoardPieceType.Rook));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(2, 8), "black", BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(3, 8), "black", BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(4, 8), "black", BoardPieceType.Queen));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(5, 8), "black", BoardPieceType.King));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(6, 8), "black", BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(7, 8), "black", BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(8, 8), "black", BoardPieceType.Rook));

			for (var i = 0; i < 8; i++) {
				piecePromises.push(self.getPiecePromise(BoardCoordinate.at(i + 1, 7), "black", BoardPieceType.Pawn));
			}

			Promise.all(piecePromises).then((pieces) => resolve());
		});
	}

	private getPiecePromise(coord: BoardCoordinate, team: string, type: BoardPieceType): Promise<BoardPiece> {
		let self = this;
		let piecePromise = this.boardPieceFactory.createBoardPiece(team, type);
		piecePromise.then((piece) => {
			self.board.get(coord).setPiece(piece)
		});

		return piecePromise;
	}
}

export default ChessBoardBuilder;
