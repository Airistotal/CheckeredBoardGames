import { BoardPieceType } from '../models/enums/BoardPieceType';

import { Mesh, Object3D } from 'three';

export interface BoardPieceGeometryBuilder {
  createGeometryFor(type: BoardPieceType): Promise<Object3D>;
}