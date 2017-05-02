import { Component, OnInit } from '@angular/core';
import { IPath } from '../game.models';
export class MovementComponent {
    xPos: number;
    yPos: number;
    speedY: number;
    speedX: number;
    gravity: number;
    constructor(xPos: number, yPos: number, public newPos?: IPath) {
        this.xPos = xPos;
        this.yPos = yPos;
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
    updateMovement() {
        this.xPos += this.speedX;
        this.yPos += this.speedY;
        this.speedY += this.gravity;
        if(this.newPos) {
            this.travelpath();
        }
    }
    private travelpath() {
            let deltaX = this.newPos.x - this.xPos;
            let deltaY = this.newPos.y - this.yPos;
            let angle = Math.atan2(deltaY, deltaX);
            this.speedX = this.newPos.speed * Math.cos(angle);
            this.speedY = this.newPos.speed * Math.sin(angle);
            if (this.newPos.infinit) {
                this.newPos.x += deltaX;
                this.newPos.y += deltaY;
            }
    }
    
}