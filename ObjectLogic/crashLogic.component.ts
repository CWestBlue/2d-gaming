import { Component, OnInit } from '@angular/core';
import { ObjectComponent } from '../game.objects.component';
import { ObjectArray } from './ammo.component';
import { GameObjectCategory } from '../GameAreaLogic/object-category-setter';
import * as _ from 'lodash';

export class CrashComponent {
    constructor(public splitter: GameObjectCategory ) { 

    }

     private hitBarrier(object: ObjectComponent) {
        let right = object.game.canvas.width;
        let bottom = object.game.canvas.height
        if (this.leavesWith(object)) {
            switch (this.leavesWith(object)) {
                case 'right': object.xPos = object.game.canvas.width - object.design.width; object.speedX = 0; break;
                case 'left': object.xPos = 0; break;
                case 'bottom': object.yPos = object.game.canvas.height - object.design.height; object.speedY = 0;
                    object.speedY = 0;
                    // this.gravity = 0;
                    break;
                case 'top': object.yPos = 0; break;
            }
            return true;
        }
        if (this.splitter.barriers.length > 0) {
            this.splitter.barriers.forEach(obj => {
                if (!(this.crashWithSide(object, obj) === 'false')) {
                    this.addClip(this.crashWithSide(object, obj), object, obj);
                    return true;
                }
            })
        }
        return false;
    }

    addClip(side: string, object: ObjectComponent, barrier: ObjectComponent) {
        // console.log(side);
        switch(side) {
            case 'top': object.yPos = barrier.yPos - object.design.height; break;
            case 'bottom': object.yPos = barrier.yPos + barrier.design.height; break;
            case 'right': object.xPos = barrier.xPos + barrier.design.width; break;
            case 'left': object.xPos = barrier.xPos - object.design.width; break;
        }
    }
    crashWithSide(currentObj: ObjectComponent, otherobj: ObjectComponent): string {
        let myleft = currentObj.xPos;
        let myright = currentObj.xPos + (currentObj.design.width);
        let mytop = currentObj.yPos;
        let mybottom = currentObj.yPos + (currentObj.design.height);
        let otherleft = otherobj.xPos;
        let otherright = otherobj.xPos + (otherobj.design.width);
        let othertop = otherobj.yPos;
        let otherbottom = otherobj.yPos + (otherobj.design.height);
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            return 'false';
        } else {
            if(mybottom > othertop && mytop < othertop) {
                // this.addClip('top', currentObj, otherobj)
                return 'top';
            }
            if(mytop < otherbottom && mybottom > otherbottom) {
                // this.addClip('bottom', currentObj, otherobj)
                return 'bottom';
            }
            if(myright > otherleft && myleft < otherleft) {
                // this.addClip('left', currentObj, otherobj)
                return 'left';
            }
            if(myleft < otherright && myright > otherright) {
                // this.addClip('right', currentObj, otherobj)
                return 'right';
            }
        }
    }
    leavesWith(object: ObjectComponent): any {
        let myleft = object.xPos;
        let myright = object.xPos + (object.design.width);
        let mytop = object.yPos;
        let mybottom = object.yPos + (object.design.height);
        let otherleft = 0;
        let otherright = object.game.canvas.width
        let othertop = 0;
        let otherbottom = object.game.canvas.height;
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
         newPos(barrier?) {
        this.splitter.nonBarriers.items.forEach( res =>
        {
        if (barrier) {
            if (this.hitBarrier(res)) {
                if (!(this.leavesWith(res) === 'bottom')) {
                    return;
                } else {
                    res.speedY = 0;
                }
            }
        }
    }
        )
    }

}