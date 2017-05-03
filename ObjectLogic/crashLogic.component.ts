import { Component, OnInit } from '@angular/core';
import { ObjectComponent } from '../game.objects.component';
import { ObjectArray } from './ammo.component';

export class CrashComponent {
    constructor(public object: ObjectArray, public barriers: ObjectArray ) { 

    }

     private hitBarrier(object: ObjectComponent) {
        let right = object.game.canvas.width;
        let bottom = object.game.canvas.height
        if (this.leavesWith(object)) {
            switch (this.leavesWith(object)) {
                case 'right': object.postion.xPos = object.game.canvas.width - object.design.width; object.movement.speedX = 0; break;
                case 'left': object.postion.xPos = 0; break;
                case 'bottom': object.postion.yPos = object.game.canvas.height - object.design.height; object.movement.speedY = 0;
                    object.movement.speedY = 0;
                    // this.gravity = 0;
                    break;
                case 'top': object.postion.yPos = 0; break;
            }
            return true;
        }
        if (object.game.barriers.items.length > 0) {
            object.game.barriers.items.forEach(obj => {
                if (this.crashWith(object, obj)) {
                    object.postion.yPos = obj.postion.yPos - object.design.height;
                    return true;
                }
            })
        }
        return false;
    }
    crashWith(currentObj: ObjectComponent, otherobj): boolean {
        let myleft = currentObj.postion.xPos;
        let myright = currentObj.postion.xPos + (currentObj.design.width);
        let mytop = currentObj.postion.yPos;
        let mybottom = currentObj.postion.yPos + (currentObj.design.height);
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
    leavesWith(object: ObjectComponent): any {
        let myleft = object.postion.xPos;
        let myright = object.postion.xPos + (object.design.width);
        let mytop = object.postion.yPos;
        let mybottom = object.postion.yPos + (object.design.height);
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
        this.object.items.forEach( res =>
        {
        if (barrier) {
            if (this.hitBarrier(res)) {
                if (!(this.leavesWith(res) === 'bottom')) {
                    return;
                } else {
                    res.movement.speedY = 0;
                }
            }
        }
    }
        )
    }

}