import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IGameArea } from "./game.models";

@Component({
    selector: 'app-game-area',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameAreaComponent implements OnInit {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    interval: any;
    clear;
    frame: number;
    button: any;
    area: HTMLElement;
    gravity: number;
    constructor() {
        this.clear = function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
     }

    ngOnInit() {
     }

    config(attributes: IGameArea) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        this.frame = 0;
        this.canvas.style.cursor = 'none';
        this.canvas.style.width = attributes.width;
        this.canvas.style.height = attributes.height;
        this.canvas.style.border = '1px solid black';
        this.context = (<CanvasRenderingContext2D> this.canvas.getContext('2d'));
        this.area = document.getElementById('area');
        this.area.id = attributes.name;
        this.area.appendChild(this.canvas);
        this.gravity = attributes.gravity;
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
}
