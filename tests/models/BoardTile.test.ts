import BoardTile from '../../src/models/BoardTile';
import BoardPiece from '../../src/models/BoardPiece';
import Team from '../../src/models/enums/Team';
import BoardPieceType from '../../src/models/enums/BoardPieceType';
import { expect } from 'chai';
import { Color, MeshPhongMaterial, Mesh } from 'three';
import 'mocha';

describe('BoardTile tests', () => {
	it('create with correct properties', () => {
		let boardTile = new BoardTile(new Color(Team.White), undefined);

		expect(boardTile.getPiece()).to.be.undefined;
		expect(boardTile.getColor().equals(new Color(Team.White))).to.be.true;
		expect(boardTile.getRenderableTile()).to.not.be.undefined;
		expect(boardTile.getRenderableTile()).to.not.be.null;
	});

	it('has mesh with color', () => {
		let boardTile = new BoardTile(new Color(Team.White), undefined);
		let mesh = (<Mesh>boardTile.getRenderableTile().children[0]);
		let material = (<MeshPhongMaterial>mesh.material);

		expect(material.color.equals(new Color(Team.White))).to.be.true;
	});

	it('can change piece', () => {
		let boardTile = new BoardTile(new Color(Team.White), undefined);
		let boardPiece = new BoardPiece(Team.White, BoardPieceType.Knight, new Mesh());

		boardTile.setPiece(boardPiece);
		let piece = boardTile.getPiece();

		expect(piece).to.not.be.undefined;
		if (piece === undefined) return;
		expect(piece.team).to.eql(Team.White);
	});
});