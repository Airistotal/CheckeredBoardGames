import BoardPieceType from '../models/enums/BoardPieceType';

import { Mesh, Object3D } from 'three';

interface BoardPieceGeometryFactory {
  createGeometryFor(type: BoardPieceType, callback: (x: Object3D) => void): void;
}

export default BoardPieceGeometryFactory;