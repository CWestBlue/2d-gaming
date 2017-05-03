import { Component, OnInit } from '@angular/core';
import { ObjectComponent } from '../game.objects.component';
import * as _ from 'lodash';
export class ObjectArray {
    howMany: number;
    items: ObjectComponent[] = []
    constructor(public item?: ObjectComponent, howMany?: number) {
        this.howMany = howMany;
        this.multiply();
     }
     multiply() {
        for(let i = 0; i <= this.howMany; i++ ) {
            this.items.push(this.item);
        }
     }
     update() {
         this.items.forEach(res => {
             this.item.game.gameObjects.add(res);
         });
     }
     remove(objects: ObjectArray) {
         this.items.forEach(item => {
            let i = _.findIndex(objects.items, (o) => { return o === item} )
            let obj = objects.items[i];
            item.game.context.clearRect(obj.postion.xPos, obj.postion.yPos, obj.design.width, obj.design.height)
            objects.items.splice(i, 1);
         })
         this.items = [];

     }
     add(item: ObjectComponent) {
         this.items.push(item);
     }

}