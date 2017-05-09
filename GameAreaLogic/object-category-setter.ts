import { Component, OnInit } from '@angular/core';
import { ObjectArray } from '../ObjectLogic/ammo.component';
export class GameObjectCategory {
    barriers: ObjectArray;
    nonBarriers: ObjectArray;
    constructor(public gameObjects: ObjectArray) { 
        this.barriers = new ObjectArray();
        this.nonBarriers = new ObjectArray();
    }
    set() {
        this.gameObjects.items.forEach(item => {
            if(item.isBarrier === true) {
                this.barriers.add(item)
            } else {
                this.nonBarriers.add(item)
            }
        })
    }
    clear() {
        this.barriers.items = [];
        this.nonBarriers.items = [];
    }

}