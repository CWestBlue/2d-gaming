import { Component, OnInit } from '@angular/core';
import { ObjectDesign } from '../Design/objectDesign.component';
import { PositionObject } from './postion.component';
import { ObjectComponent } from '../game.objects.component';
import { GameAreaObject } from '../game-area.object';
import { ObjectArray } from './ammo.component';
import { groupPos } from './comparer';
export class GroupItem extends ObjectArray {
    centerDot: ObjectComponent; 
    difPos: PositionObject;
    center: ObjectComponent;
       constructor(public game: GameAreaObject, public p: PositionObject, public isBarrier: boolean) { 
        super()
        let dotD = new ObjectDesign(12,12,'circle', 'black');
        this.centerDot = new ObjectComponent(game, dotD, p, isBarrier );
        
     }
    addToGroup(p: PositionObject, d: ObjectDesign) {
        let o = new ObjectComponent(this.game, d, p, this.isBarrier);
        this.getLocation(o)
        this.items.push(o)
     }
     getLocation(p: ObjectComponent) {
        let xDif = p.xPos - this.p.xPos;
        let yDif = p.yPos - this.p.yPos;
        let posUpdate = new groupPos(this.centerDot, p, xDif, yDif);
        this.game.splitter.groupObjects.push(posUpdate);

     }
//    private locationInObject(item: ObjectComponent) {
//        let xPos = this.p.xPos + item.xPos;
//        let yPos = this.p.yPos + item.yPos; 
//        this.items.forEach(res => {
//            if(this.game.crashHandler.crash(res)) {
//             this.centerDot
//            }
//        })
//       return new PositionObject(xPos, yPos);
//     }
//     updatePos() {
//         this.items.forEach(item => {
//          item.position = this.locationInObject(item)
//         })
//     }

}