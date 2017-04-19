import { Component, OnInit } from '@angular/core';
import { GameAreaObject } from './game-area.object';
import { IPath, IGameObject } from "./index";
export class ObjectComponent implements IGameObject {
    width: number;
    height: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    private barriers: ObjectComponent[] = [];
    gravity: number;
    bullets: ObjectComponent[] = [];
    gravitySpeed = 0;
    ctx: CanvasRenderingContext2D;
    private isShoot: boolean;
    image: any;
    type: string;
    color: any;
    score: number = 1;
    path: IPath;
    text: any;
    game: GameAreaObject;
    constructor(
        game: GameAreaObject, width: any,
        height: any, look: string, xPos: number,
        yPos: number, type: string
    ) {
        this.game = game;
        this.width = width;
        this.height = height,
            this.color = look;
        this.x = xPos;
        this.y = yPos;
        this.type = type;
        this.create(type);
    }
    private newPos(barrier?) {
        this.x += this.speedX;
        this.y += this.speedY = this.gravitySpeed;
        this.gravitySpeed += this.gravity;
        if (barrier) {
            if (this.hitBarrier()) {
                if (!(this.leavesWith() === 'bottom')) {
                    return;
                } else {
                    this.gravitySpeed = 0;
                }
            }
        }
    }
    add(barrier: ObjectComponent) {
        this.barriers.push(barrier)
    }
    private hitBarrier() {
        let right = this.game.canvas.width;
        let bottom = this.game.canvas.height
        if (this.leavesWith()) {
            switch (this.leavesWith()) {
                case 'right': this.x = this.game.canvas.width - this.width; this.speedX = 0 ; break;
                case 'left': this.x = 0 ; break;
                case 'bottom': this.y = this.game.canvas.height - this.height; this.gravitySpeed = 0;
                    this.speedY = 0;
                    // this.gravity = 0;
                     break;
                case 'top': this.y = 0; break;
            }
            return true;
        }
        if (this.barriers.length > 0) {
            this.barriers.forEach(obj => {
                if (this.crashWith(obj)) {
                    this.y = obj.y - this.height;
                    return true;
                }
            })
        }
        return false;
    }
    private travelpath() {
        if (this.path) {
            let deltaX = this.path.x - this.x;
            let deltaY = this.path.y - this.y;
            let angle = Math.atan2(deltaY, deltaX);
            this.speedX = this.path.speed * Math.cos(angle);
            this.gravitySpeed = this.path.speed * Math.sin(angle);
            if (this.isShoot) {
                this.path.x += deltaX;
                this.path.y += deltaY;
            }
        } else {
            return;
        }
    }
    jump(n) {
        console.log('madeit');
        const originalSpeed = this.gravitySpeed;
        this.gravitySpeed = -n;
        // setTimeout(() => { this.gravitySpeed = originalSpeed; }, 40);
    }
    shoot(x, y, speed, object: ObjectComponent) {
        console.log('shoot')
        let arrow = new ObjectComponent(this.game, object.width, object.height, object.color, this.x, this.y, object.type);
        arrow.isShoot = true;
        arrow.path = {
            x: x,
            y: y,
            speed: speed
        }
        this.bullets.push(arrow);
    }
    update(barrier?, ground?) {
        if (this.barriers.length > 0) {
            this.barriers.forEach(res => {
                res.update(false)
            })
        }
        if (this.bullets.length > 0) {
            this.bullets.forEach(res => {
                res.update(false);
            })
        }
        this.travelpath();
        this.newPos(barrier);
        this.ctx = this.game.context;
        switch (this.type) {
            case 'image': //this.image.onload = (() => this.imageReady(this.image))
                this.ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height); break;
            case 'text': this.ctx.font = this.width + " " + this.height;
                this.ctx.fillStyle = this.color;
                this.ctx.fillText(this.text, this.x, this.y); break;
            default: this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height); break;
        }

    }
    private create(type) {
        if (type === "image") {
            this.image = new Image();
            this.image.src = this.color;
        }
        let groundCount = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = this.game.gravity;
        this.gravitySpeed = 0;
        this.ctx = this.game.context
    }
    crashWith(otherobj): boolean {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            return false;
        } else {
            return true;
        }
    }
    leavesWith(): any {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = 0;
        let otherright = this.game.canvas.width
        let othertop = 0;
        let otherbottom = this.game.canvas.height;
        if ((mytop < othertop) ||
            (mybottom > otherbottom) ||
            (myleft < otherleft) ||
            (myright > otherright)) {
             if (mytop < othertop) {
                return 'top';
            }
            if (mybottom > otherbottom) {
                return 'bottom';
            }
            if (myleft < otherleft) {
                return 'left';
            }
            if (myright > otherright) {
                return 'right';
            }
        } else {
           return;
        }
    }
}