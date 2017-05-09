import { Component, OnInit } from '@angular/core';
import { IPath } from '../game.models';
import { PositionObject } from './postion.component'
export class MovementComponent {
    speedY: number;
    speedX: number;
    gravity: number;
    constructor( public position: PositionObject, public newPos?: IPath ) {
    }
    moveRight(speed) {
        this.speedX = speed;
    }
    moveLeft(speed) {
        this.speedX = -speed;
    }
    moveUp(speed) {
        this.speedY = -speed;
    }
    moveDown(speed) {
        this.speedY = speed;
    }
    clearMovement() {
        this.speedY = 0;
        this.speedX = 0;
    }
    updateMovement() {
        this.position.xPos += this.speedX;
        this.position.yPos += this.speedY;
        this.speedY += this.gravity;
        if(this.newPos) {
            this.travelpath();
        }
    }
    private travelpath() {
            let deltaX = this.newPos.x - this.position.xPos;
            let deltaY = this.newPos.y - this.position.yPos;
            let angle = Math.atan2(deltaY, deltaX);
            this.speedX = this.newPos.speed * Math.cos(angle);
            this.speedY = this.newPos.speed * Math.sin(angle);
            if (this.newPos.infinit) {
                this.newPos.x += deltaX;
                this.newPos.y += deltaY;
            }
    }
    
}