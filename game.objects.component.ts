import { Component, OnInit } from '@angular/core';
import { GameAreaObject } from './game-area.object';
import { IPath, IGameObject, IDesign } from "./index";
import { ObjectDesign } from './Design/objectDesign.component';
import { MovementComponent } from './ObjectLogic/movement.component';
import { ObjectArray } from './ObjectLogic/ammo.component';
export class ObjectComponent implements IGameObject {
    origin: ObjectComponent;
    private barriers: ObjectArray; 
    private bullets: ObjectArray;
    ctx: CanvasRenderingContext2D;
    score: number = 1;
    barrier: boolean;
    type: string;
    constructor( 
        public game: GameAreaObject, 
        public design: ObjectDesign, 
        public movement: MovementComponent,
        isBarrier: boolean,
        type: string
    ) {
        this.type = type;
        this.bullets = new ObjectArray();
        this.create();
        if(isBarrier) {
            this.game.barriers.add(this);
        }
            this.game.gameObjects.add(this)
        this.typeOf();

    }
    private typeOf() {
        switch (this.type) {
            case 'image':
                this.ctx.drawImage(this.design.image,
                    this.movement.xPos,
                    this.movement.yPos,
                    this.design.width, this.design.height); break;
            case 'text': this.ctx.font = this.design.width + " " + this.design.height;
                this.ctx.fillStyle = this.design.color;
                this.ctx.fillText(this.design.text, this.movement.xPos, this.movement.yPos); break;
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(this.movement.xPos + this.design.centerX, this.movement.yPos + this.design.centerY, this.design.radius, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = this.design.color;
                this.ctx.fill();
                break;
            default: this.ctx.fillStyle = this.design.color;
                this.ctx.fillRect(this.movement.xPos, this.movement.yPos, this.design.width, this.design.height); break;
        };
    }
    shoot(x, y, speed, object: ObjectComponent) {
        // console.log('shoot')
        // let arrow = new ObjectComponent(this.game, object.design);
        // arrow.isShoot = true;
        // arrow.path = {
        //     x: x,
        //     y: y,
        //     speed: speed,
        //     infinit: false
        // }
        // this.bullets.push(arrow);
        object.movement.newPos = {
            x: x,
            y: y,
            speed: speed,
            infinit: true
        }
        this.bullets.add(object);
    }
    // update() {
    //     this.barrier = barrier;
    //     if (this.barriers.length > 0) {
    //         this.barriers.forEach(res => {
    //             res.update(false)
    //         })
    //     }
    //     if (this.bullets.length > 0) {
    //         this.bullets.forEach(res => {
    //             res.update(false);
    //         })
    //     }
    //     this.travelpath();
    //     this.newPos(barrier);
    //     this.ctx = this.game.context;
    //     this.typeOf();

    // }
    private create() {
        if (this.design.image) {
            this.design.image = new Image();
            this.design.image.src = this.design.color;
        }
        let groundCount = 0;
        this.movement.speedX = 0;
        this.movement.speedY = 0;
        this.movement.gravity = this.game.gravity;
        this.movement.speedY = 0;
        this.ctx = this.game.context
    }
}