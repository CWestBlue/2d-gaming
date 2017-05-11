import { Component, OnInit } from '@angular/core';
import { ObjectArray } from '../ObjectLogic/ammo.component';
import { GroupItem } from '../ObjectLogic/groupItem';
import { groupPos } from '../ObjectLogic/comparer';
export class GameObjectCategory {
    barriers: any[] = [];
    nonBarriers: ObjectArray;
    groupObjects: any[] = [];
    constructor(public gameObjects: any[]) { 
        this.nonBarriers = new ObjectArray();
     }
    set() {
        this.gameObjects.forEach(item => {
            if(item.isBarrier === true) {
                this.barriers.push(item)
            } else {
                this.nonBarriers.add(item)
            }
        })
    }
    clear() {this.barriers = [];
        this.nonBarriers.items = [];
    }
    update() {
        this.groupObjects.forEach((item: groupPos) => {
            item.updatePos();
        })
    }

}