import BoardPieceType from '../models/enums/BoardPieceType';

import { Mesh } from 'three';

interface BoardPieceGeometryFactory {
  createGeometryFor(type: BoardPieceType): Mesh;
}

export default BoardPieceGeometryFactory;