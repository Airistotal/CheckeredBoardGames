import { PromotionBoxBuilder } from '../../src/business/PromotionBoxBuilder';
import { Team } from '../../src/models/enums/Team';

import { Group } from 'three';

export class TestPromotionBoxBuilder implements PromotionBoxBuilder {
  public async loadPromotionBoxes(): Promise<boolean> {
    return true;
  }

  public getPromotionBoxes(team: Team): Group {
    return new Group();
  }
}