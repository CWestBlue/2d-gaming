import { Component, OnInit } from '@angular/core';
import { GameAreaObject } from './game-area.object';
import { IPath, IGameObject, IDesign } from "./index";
import { ObjectDesign } from './Design/objectDesign.component';
import { MovementComponent } from './ObjectLogic/movement.component';
import { ObjectArray } from './ObjectLogic/ammo.component';
import { PositionObject } from './ObjectLogic/postion.component';
import { UpdateHandler } from './ObjectLogic/updateFrame.component';
export class ObjectComponent extends MovementComponent implements IGameObject  {
    origin: ObjectComponent;
    private barriers: ObjectArray; 
    bullets: ObjectArray;
    ctx: CanvasRenderingContext2D;
    // startingPos: PositionObject;
    private update: UpdateHandler;
    score: number = 1;
    // movement: MovementComponent;
    newPath: IPath;
    constructor( 
        public game: GameAreaObject, 
        public design: ObjectDesign, 
        public postion: PositionObject,
        public isBarrier: boolean,
        isObjectDependent: boolean
    ) {
        super(postion)
        this.bullets = new ObjectArray();
        // this.movement = new MovementComponent(postion);
        // this.startingPos = new PositionObject(postion.xPos, postion.yPos);
        this.create();
        this.game.gameObjects.add(this);
        this.update = new UpdateHandler(this.bullets);
        this.draw();
        
    }
         draw() {
        switch (this.design.shape) {
            case 'image':
            // console.log(this.design.image);
                this.ctx.drawImage(this.design.image,
                    this.postion.xPos,
                    this.postion.yPos,
                    this.design.width, this.design.height); break;
            case 'text': this.ctx.font = this.design.width + " " + this.design.height;
                this.ctx.fillStyle = this.design.color;
                this.ctx.fillText(this.design.text, this.postion.xPos, this.postion.yPos); break;
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(this.postion.xPos + this.design.centerX, this.postion.yPos + this.design.centerY, this.design.radius, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = this.design.color;
                this.ctx.fill();
                break;
            default: this.ctx.fillStyle = this.design.color;
                this.ctx.fillRect(this.postion.xPos, this.postion.yPos, this.design.width, this.design.height); break;
        };
        this.update.update();
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
        object.newPos = {
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
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = this.game.gravity;
        this.speedY = 0;
        this.ctx = this.game.context;
    }
}