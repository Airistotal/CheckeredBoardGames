import {Team} from '../models/enums/Team';

import { Group } from 'three';

export interface PromotionBoxBuilder {
  loadPromotionBoxes(): Promise<boolean>;
  getPromotionBoxes(team: Team): Group;
}