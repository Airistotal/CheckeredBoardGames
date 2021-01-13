import { Utilities } from '../business/Utilities';
import { BoardPieceType } from './enums/BoardPieceType';
import { SceneLayer } from './enums/SceneLayer';
import { SelectedPromotion } from './SelectedPromotion';

import { Object3D, BoxGeometry, Group, MeshPhongMaterial, Mesh, BackSide } from 'three';

import { IOCTypes } from '../business/initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class PromotionBoxes {
  private numPromotionBoxes: number = 0;
  private promotionBoxes: Group = new Group();

  public addPromotionBox(promotionItem: Object3D, type: BoardPieceType) {
    var geometry = new BoxGeometry(1,1,1);
    var material = new MeshPhongMaterial({color: "grey", wireframe: false});
    material.side = BackSide;
    var cube = new Mesh(geometry, material);
    cube.layers.enable(SceneLayer.PromotionBoxes);
    cube.userData = new SelectedPromotion(type);

    let promotionItemWrapper = new Group();
    promotionItemWrapper.add(promotionItem);
    promotionItemWrapper.scale.set(0.5, 0.5, 0.5);
    promotionItemWrapper.translateZ(-0.5);
    promotionItemWrapper.translateY(-0.5);
    promotionItemWrapper.rotateZ(Utilities.degreesToRadians(-90));
    promotionItemWrapper.rotateY(Utilities.degreesToRadians(-90));

    let boxGroup = new Group();
    boxGroup.add(cube);
    boxGroup.add(promotionItemWrapper);
    boxGroup.translateX(this.numPromotionBoxes);

    this.promotionBoxes.add(boxGroup);
    this.numPromotionBoxes += 1;
  }

  public getPromotionBoxes(): Group {
    return this.promotionBoxes;
  }
}