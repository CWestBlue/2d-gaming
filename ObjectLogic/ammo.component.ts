import { Component, OnInit } from '@angular/core';
import { ObjectComponent } from '../game.objects.component';
import * as _ from 'lodash';
import { PositionObject } from './postion.component';
import { ObjectDesign } from '../Design/objectDesign.component';
import { GameAreaObject } from '../game-area.object';
export class ObjectArray {
    howMany: number;
    items: any[] = []
    constructor(public item?: ObjectComponent, howMany?: number) {
        this.howMany = howMany;
        if (item && howMany) {
            this.multiply(item, howMany);
        } else {
            this.items.push(item);
        }
    }
    // multiplys a single object
    multiply(item: ObjectComponent, howMany: number) {
        for (let i = 0; i <= this.howMany; i++) {
            this.items.push(this.item);
        }
    }
    add(item: any) {
        this.items.push(item);
    }
    // removes objects from the array paramater and this object
    removeFromGame() {
        this.items.forEach(item => {
            let i = _.findIndex(item.game.gameObjects, (o) => { return o === item });
            if (i >= 0) {
                item.game.context.clearRect(item.xPos, item.yPos, item.design.width, item.design.height)
                item.game.gameObjects.splice(i, 1);

            }
        })
    }
    addMulti(items: ObjectComponent[]) {
        items.forEach(res => {
            this.items.push(res);
        })
    }

}