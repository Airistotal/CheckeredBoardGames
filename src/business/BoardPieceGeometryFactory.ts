import BoardPieceType from '../models/enums/BoardPieceType';

import { Mesh, Object3D } from 'three';

interface BoardPieceGeometryFactory {
  createGeometryFor(type: BoardPieceType): Promise<Object3D>;
}

export default BoardPieceGeometryFactory;