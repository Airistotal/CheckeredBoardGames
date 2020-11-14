import { BoardBuilder } from '../BoardBuilder';
import { GameType } from '../../models/enums/GameType';
import { BoardPieceType } from '../../models/enums/BoardPieceType';
import { Team } from '../../models/enums/Team';
import { Board } from '../../models/Board';
import { BoardCoordinate } from '../../models/BoardCoordinate';
import { BoardPiece } from '../../models/BoardPiece';
import { BoardPieceBuilder } from '../BoardPieceBuilder';

import { Mesh, MeshPhongMaterial } from 'three';

import { IOCTypes } from '../initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class ChessBoardBuilder implements BoardBuilder {
	private readonly boardPieceBuilder: BoardPieceBuilder;
	private board!: Board;

	constructor(@inject(IOCTypes.BoardPieceBuilderFactory) abstractFactory: (type: GameType) => BoardPieceBuilder) {
		this.boardPieceBuilder = abstractFactory(GameType.Chess);
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

			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(1, 1), Team.White, BoardPieceType.Rook));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(2, 1), Team.White, BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(3, 1), Team.White, BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(4, 1), Team.White, BoardPieceType.Queen));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(5, 1), Team.White, BoardPieceType.King));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(6, 1), Team.White, BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(7, 1), Team.White, BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(8, 1), Team.White, BoardPieceType.Rook));

			for (var i = 0; i < 8; i++) {
				piecePromises.push(self.getPiecePromise(BoardCoordinate.at(i + 1, 2), Team.White, BoardPieceType.Pawn));
			}

			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(1, 8), Team.Black, BoardPieceType.Rook));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(2, 8), Team.Black, BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(3, 8), Team.Black, BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(4, 8), Team.Black, BoardPieceType.Queen));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(5, 8), Team.Black, BoardPieceType.King));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(6, 8), Team.Black, BoardPieceType.Bishop));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(7, 8), Team.Black, BoardPieceType.Knight));
			piecePromises.push(self.getPiecePromise(BoardCoordinate.at(8, 8), Team.Black, BoardPieceType.Rook));

			for (var i = 0; i < 8; i++) {
				piecePromises.push(self.getPiecePromise(BoardCoordinate.at(i + 1, 7), Team.Black, BoardPieceType.Pawn));
			}

			Promise.all(piecePromises).then((pieces) => resolve());
		});
	}

	private getPiecePromise(coord: BoardCoordinate, team: Team, type: BoardPieceType): Promise<BoardPiece> {
		let self = this;
		let piecePromise = this.boardPieceBuilder.createBoardPiece(team, type);
		piecePromise.then((piece) => {
			self.board.set(coord, piece)
		});

		return piecePromise;
	}
}