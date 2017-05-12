import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { IGameArea } from "./game.models";
import { ObjectComponent } from './game.objects.component';
import { ObjectArray } from './ObjectLogic/ammo.component';
import { CrashComponent } from './ObjectLogic/crashLogic.component';
import { UpdateHandler } from './ObjectLogic/updateFrame.component';
import * as _ from 'lodash';
import { GameObjectCategory } from './GameAreaLogic/object-category-setter';
import { groupPos } from './ObjectLogic/comparer';

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
    gameObjects: any[] = [];
    splitter: GameObjectCategory;
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
        this.update = new UpdateHandler(this.gameObjects);
        this.splitter = new GameObjectCategory(this.gameObjects);
        this.crashHandler = new CrashComponent(this.splitter);
    }

    start() {
        console.log('started');
        if (this.startOn === false) {
            if (this.doEveryFrame) {
                this.interval = setInterval(() => { this.perFrame()}, 20);
                this.startOn = true;
            }
        }
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    private perFrame() {
        this.clear(); 
        this.frame += 1;  
        this.doEveryFrame(); 
        this.splitter.clear(); 
        this.splitter.set(); 
        this.crashHandler.newPos(true); 
        // this.splitter.update(); 
        this.splitter.groupObjects.forEach((res: groupPos) => {
            res.updatePos();
        })
        this.update.update();
    }
    stop() {
        this.startOn = false;
        clearInterval(this.interval);
        this.gameObjects.forEach(res => {
            // if (res.bullets.items) {
            //     res.bullets.items.forEach(bull => {
            //         this.context.clearRect(bull.postion.xPos, bull.postion.yPos, bull.design.width, bull.design.height)
            //         let index = _.findIndex(this.gameObjects.items, (o) => { return o === bull });
            //         this.gameObjects.items.splice(index, 1);
            //     })
            //     res.bullets.items = [];
            // }
            // this.context.clearRect(res.postion.xPos, res.postion.yPos, res.design.width, res.design.height)
            // console.log('now: ' + res.postion.xPos);
            // res.postion.xPos = res.startingPos.xPos;
            // res.postion.yPos = res.startingPos.yPos;
            // this.update.update();
        })
        // this.gameObjects.items = [];
        
        this.splitter.clear();
        this.frame = 0;
    }

    // remove(object: ObjectArray) {
    //     this.
    // }
    everyinterval(frames: number) {
        if ((this.frame / frames) % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }
}
