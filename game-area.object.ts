import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { IGameArea } from "./game.models";

export class GameAreaObject implements IGameArea{
    doEveryFrame: () => void;
    gravity = 0;
    canvas = document.createElement('canvas')
    context = (<CanvasRenderingContext2D> this.canvas.getContext('2d'));
    frame = 0;
    interval: any;
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
        if(this.doEveryFrame) {
            this.interval = setInterval(() => { this.doEveryFrame(); }, 20);
        }
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    stop(sky, player, objects?, ground?) {
        clearInterval(this.interval);
        if (objects) {
            objects.forEach(object => { this.context.clearRect(object.x, object.y, object.width, object.height)})
        }
            sky.update();
            if (ground) {
            ground.update();
        }
            player.update();

    }
    everyinterval(frames: number) {
        if ((this.frame / frames) % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }
}
