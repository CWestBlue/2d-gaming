import { Component, OnInit } from '@angular/core';
import { ObjectComponent } from '../game.objects.component';
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
         })
     }
     add(item: ObjectComponent) {
         this.items.push(item);
     }

}