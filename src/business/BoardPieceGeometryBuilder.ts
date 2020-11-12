import BoardPieceType from '../models/enums/BoardPieceType';

import { Mesh, Object3D } from 'three';

interface BoardPieceGeometryBuilder {
  createGeometryFor(type: BoardPieceType): Promise<Object3D>;
}

export default BoardPieceGeometryBuilder;