import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { IGameArea } from "./game.models";
import { ObjectComponent } from './game.objects.component';
import * as _ from 'lodash';

export class GameAreaObject implements IGameArea {
    doEveryFrame: () => void;
    gravity = 0;
    canvas = document.createElement('canvas')
    context = (<CanvasRenderingContext2D>this.canvas.getContext('2d'));
    frame = 0;
    private startOn: boolean = false;
    interval: any;
    gameObjects: ObjectComponent[] = [];
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
    }

    start() {
        if(this.startOn === false){
        if (this.doEveryFrame) {
            this.interval = setInterval(() => { this.doEveryFrame(); }, 20);
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
        this.gameObjects.forEach(res => {
            if (res.bullets) {
                res.bullets.forEach(bull => {
                    this.context.clearRect(bull.x, bull.y, bull.width, bull.height)
                    let index = _.findIndex(this.gameObjects, (o) => { return o === bull });
                    this.gameObjects.splice(index, 1);
                })
                res.bullets = [];
            }
            this.context.clearRect(res.x, res.y, res.width, res.height)
            res.update();
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
