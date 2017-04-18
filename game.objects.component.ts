import { Component, OnInit } from '@angular/core';
import { GameAreaObject } from './game-area.object';
import { IPath, IGameObject } from "./index";
export class ObjectComponent implements IGameObject {
    width: number;
    height: number;
    x: number;
    y: number;
    // update: any;
    speedX: number;
    speedY: number;
    // private newPos: any;
    gravity: number;
    gravitySpeed = 0;
    ctx: CanvasRenderingContext2D;
    // falling: any;
    // hitGround: any;
    // type: any;
    image: any;
    // crashWith: any;
    // private _timer;	// a simple timer
    // private _startX = 0;
    // private _startY = 0;
    // private _counter;
    // create: any;
    // start: any;
    type: string;
    color: any;
    // properties: any;
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
    hitGround = function (game, ground?): boolean {
        let top = game.canvas.height;
        let bottom = game.canvas.height - this.height;
        let hit = false

        if (ground) {
            bottom = game.canvas.height - ground.height - this.height;
        }
        if (this.y > bottom) {
            this.y = bottom;
            this.groundCount = 1;
            hit = true;

            return true
        } else if (this.y < 0) {
            this.y = 2;
            return false;
        }
        else {
            return false;
        }

    }
   private newPos = function (ground?, barrrier?) {
        this.x += this.speedX;
        if (!barrrier) {
            this.y += this.speedY = this.gravitySpeed;
            this.gravitySpeed += this.gravity;
        } else {
            if (this.hitGround(this.game, ground)) {
                this.speedY = 0;
                this.gravitySpeed = 0;
            }
            if (!(this.hitGround(this.game, ground))) {
                this.y += this.speedY + this.gravitySpeed;
                this.gravitySpeed += this.gravity;
            }
        }


    }
   private travelpath() {
        if (this.path) {
            let deltaX = this.path.x - this.x;
            let deltaY = this.path.y - this.y;
            let angle = Math.atan2(deltaY, deltaX);
            this.speedX = this.path.speed * Math.cos(angle);
            this.speedY = this.path.speed * Math.sin(angle);
        } else {
            return;
        }
    }
    update(barrrier?, ground?) {
        this.travelpath();
        this.newPos(ground, barrrier);
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
    crashWith = function (otherobj): boolean {
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
}