import { Component, OnInit } from '@angular/core';
import { GameAreaComponent } from './game-area.component';


@Component({
    selector: 'app-game-object',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class ObjectComponent {
    width: number;
    height: number;
    x: number;
    y: number;
    update: any;
    speedX: number;
    speedY: number;
    newPos: any;
    gravity: number;
    gravitySpeed = 0;
    ctx: CanvasRenderingContext2D;
    falling: any;
    hitGround: any;
    type: any;
    image: any;
    crashWith: any;
    private _timer;	// a simple timer
    middle: boolean;
    private _startX = 0;
    private _startY = 0;
    private _counter;
    create: any;
    start: any;
    color: any;
    src: boolean = true;
    score: number = 1;
    text: any;
    maxWidth: any;
    constructor() {
        this.create = function (width?: number, height?: number, color?: string, x?: number, y?: number, game?: GameAreaComponent, type?: string, controller?: any, maxWidth?: any) {
            this.color = color;
            this.game = game;
            this.maxWidth = maxWidth;
            if (!this.type) {
                this.type = type;
            }
            if (this.type === "image") {
                console.log("image")
                this.image = new Image();
                this.image.src = this.color;
                console.log(color);
            }
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            let groundCount = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.gravity = game.gravity;
            this.gravitySpeed = 0;
            this.ctx = game.context

            this.update = function () {
                this.ctx = game.context;
                switch (this.type) {
                    case 'image': //this.image.onload = (() => this.imageReady(this.image))
                        this.ctx.drawImage(this.image,
                            this.x,
                            this.y,
                            this.width, this.height); break;
                    case 'text': this.ctx.font = this.width + " " + this.height;
                        this.ctx.fillStyle = color;
                        this.ctx.fillText(this.text, this.x, this.y, this.maxWidth); break;
                    default: this.ctx.fillStyle = color;
                        this.ctx.fillRect(this.x, this.y, this.width, this.height); break;
                }

            }
            this.newPos = function (ground?, barrrier?) {
                this.x += this.speedX;
                if (!barrrier) {
                    this.y += this.speedY = this.gravitySpeed;
                    this.gravitySpeed += this.gravity;
                } else {
                    if (this.hitGround(game, ground)) {
                        this.speedY = 0;
                        this.gravitySpeed = 0;
                    }
                    if (!(this.hitGround(game, ground))) {
                        this.y += this.speedY + this.gravitySpeed;
                        this.gravitySpeed += this.gravity;
                    }
                }


            }

            this.falling = function (game, ground?) {
                let falling = false;
                if (!this.hitGround(game, ground)) {
                    console.log('falling');
                    groundCount = 0;
                    falling = true
                }
                return falling;
            }

            this.hitGround = function (game, ground?): boolean {
                let top = game.canvas.height;
                let bottom = game.canvas.height - this.height;
                let hit = false

                if (ground) {
                    bottom = game.canvas.height - ground.height - this.height;
                    //     if (this.y > bottom ) {
                    //         this.y = bottom;
                    //     hit = true;
                    //     groundCount = 1;
                    //     return true
                    //  } 
                    //  else {
                    //     return false
                    // }

                    // } else {
                }
                if (this.y > bottom) {
                    this.y = bottom;
                    groundCount = 1;
                    hit = true;

                    return true
                } else if (this.y < 0) {
                    this.y = 2;
                    return false;
                }
                //     else if ( this.y < top) {
                //     this.y = top;
                //     return true;
                // }
                else {
                    return false;
                }

            }


            this.crashWith = function (otherobj): boolean {
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
    }

    imageReady(p: any) {
        console.log('herer');
        this.ctx.drawImage(p,
            this.x,
            this.y,
            this.width, this.height
        )
        this.ctx.fillText

        // this._counter = setInterval(() => this.deformTerrain(this._startX += 20, this._startY, 40), 1000);
    }

    //       deformTerrain(size:number, posX:number, posY:number) {
    //    		var g = this.ctx.createRadialGradient(posX + (size / 2), posY + (size / 2), 0, posX + (size / 2), posY + (size / 2), size);

    // 		g.addColorStop(1, 'rgba(0,0,255,0)');
    // 		g.addColorStop(0.99, 'rgba(0,0,255,1)');
    // 		g.addColorStop(0, 'rgba(0,0,255,1)');

    // 		this.ctx.fillStyle = g;
    // 		this.ctx.globalCompositeOperation = 'xor';
    // 		this.ctx.fillRect(posX - (size / 2), posY - (size / 2), size * 2, size * 2);
    //    }


}