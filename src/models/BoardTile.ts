import BoardPiece from './BoardPiece';
import { Color, Mesh, MeshPhongMaterial, BoxGeometry, Group } from 'three';

class BoardTile {
  private piece?: BoardPiece;
  private color: Color;
  private tileMesh!: Mesh;
  private tileMeshGroup: Group = new Group();

  constructor(color: Color, piece?: BoardPiece) {
    this.piece = piece;
    this.color = color;
    this.createMeshGroup();
  }

  private createMeshGroup() {
    let geometry = new BoxGeometry(1, 1, 0.25);
    let material = new MeshPhongMaterial({color: this.color});
    this.tileMesh = new Mesh(geometry, material);
    this.tileMeshGroup.add(this.tileMesh);

    this.updateMeshGroupWithPiece(this.piece);
  }

  public getPiece(): BoardPiece | undefined {
    return this.piece;
  }

  public setPiece(piece?: BoardPiece): void {
    this.updateMeshGroupWithPiece(piece);

    this.piece = piece;
  }

  public getColor(): Color {
    return this.color;
  }

  public getRenderableTile(): Group {
    return this.tileMeshGroup;
  }

  private updateMeshGroupWithPiece(piece?: BoardPiece) {
    if (this.piece !== undefined) {
      this.tileMeshGroup.remove(this.piece.getRenderablePiece());
    }

    if (piece !== undefined) {
      let renderablePiece = piece.getRenderablePiece();
      renderablePiece.translateY(0.625);
      
      this.tileMeshGroup.add(renderablePiece);
    }
  }
}

export default BoardTile;
