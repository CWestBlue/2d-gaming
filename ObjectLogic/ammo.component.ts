import { Component, OnInit } from '@angular/core';
import { ObjectComponent } from '../game.objects.component';
import * as _ from 'lodash';
export class ObjectArray {
    howMany: number;
    items: ObjectComponent[] = []
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
    update() {
        this.items.forEach(res => {
            this.item.game.gameObjects.add(res);
        });
    }
    // removes objects from the array paramater and this object
    removeFromGame() {
        this.items.forEach(item => {
            let i = _.findIndex(item.game.gameObjects.items, (o) => { return o === item });
            if (i >= 0) {
                item.game.context.clearRect(item.postion.xPos, item.postion.yPos, item.design.width, item.design.height)
                item.game.gameObjects.items.splice(i, 1);

            }
        })
    }
    add(item: ObjectComponent) {
        this.items.push(item);
    }

    addMulti(items: ObjectComponent[]) {
        items.forEach(res => {
            this.items.push(res);
        })
    }

}