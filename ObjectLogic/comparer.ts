import { Component, OnInit } from '@angular/core';
import { PositionObject } from './postion.component';
import { ObjectComponent } from '../game.objects.component';
export class groupPos {
    constructor(
        public centerP: ObjectComponent,
        public currentPos: ObjectComponent,
        public difX: number,
        public difY: number) { }

    updatePos() {
console.log(this.centerP.game.crashHandler.crash(this.currentPos))
        if (this.centerP.game.crashHandler.crash(this.currentPos)) {
            console.log('crash');
            this.centerP.yPos = this.currentPos.yPos - this.difY;
            this.centerP.xPos = this.currentPos.xPos - this.difX;
            this.centerP.gravity = 0;
        } else {
            this.currentPos.xPos = this.centerP.xPos + this.difX;
            this.currentPos.yPos = this.centerP.yPos + this.difY;
            // this.currentPos.gravity = this.centerP.game.gravity;
        }
    }

}