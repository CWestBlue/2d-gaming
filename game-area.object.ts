import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { IGameArea } from "./game.models";
import { ObjectComponent } from './game.objects.component';
import { ObjectArray } from './ObjectLogic/ammo.component';
import { CrashComponent } from './ObjectLogic/crashLogic.component';
import { UpdateHandler } from './ObjectLogic/updateFrame.component';
import * as _ from 'lodash';

export class GameAreaObject implements IGameArea {
    doEveryFrame: () => void;
    gravity = 0;
    canvas = document.createElement('canvas')
    context = (<CanvasRenderingContext2D>this.canvas.getContext('2d'));
    frame = 0;
    private startOn: boolean = false;
    interval: any;
    crashHandler: CrashComponent;
    update: UpdateHandler;
    gameObjects: ObjectArray;
    noneBarriers: ObjectArray;
    barriers: ObjectArray;
    area = document.getElementById('area');
    constructor(public name: string, public width: string, public height: string) {
        this.height = height;
        this.width = width;
        this.canvas.id = name + 'Canvas';
        this.canvas.style.border = '1px solid black';
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.area.id = name;
        this.area.appendChild(this.canvas);
        this.gameObjects = new ObjectArray();
        this.barriers = new ObjectArray();
        this.noneBarriers = new ObjectArray();
        this.crashHandler = new CrashComponent(this.noneBarriers, this.barriers);
        this.update = new UpdateHandler(this.gameObjects);
    }

    start() {
        console.log('started');
        if(this.startOn === false){
        if (this.doEveryFrame) {
            this.interval = setInterval(() => { this.doEveryFrame(); this.crashHandler.newPos(true); this.update.update(); }, 20);
            this.startOn = true;
        }
    }
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    stop() {
        this.startOn = false;
        clearInterval(this.interval);
        this.gameObjects.items.forEach(res => {
            // if (res.bullets.items) {
            //     res.bullets.items.forEach(bull => {
            //         this.context.clearRect(bull.postion.xPos, bull.postion.yPos, bull.design.width, bull.design.height)
            //         let index = _.findIndex(this.gameObjects.items, (o) => { return o === bull });
            //         this.gameObjects.items.splice(index, 1);
            //     })
            //     res.bullets.items = [];
            // }
            // this.context.clearRect(res.postion.xPos, res.postion.yPos, res.design.width, res.design.height)
            console.log('now: ' + res.postion.xPos);
            console.log('first: ' + res.startingPos.xPos);
            // res.postion.xPos = res.startingPos.xPos;
            // res.postion.yPos = res.startingPos.yPos;
            // this.update.update();
        })
        this.frame = 0;
    }
    everyinterval(frames: number) {
        if ((this.frame / frames) % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }
}
