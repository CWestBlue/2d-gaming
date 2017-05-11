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
                case 'right': object.postion.xPos = object.game.canvas.width - object.design.width; object.speedX = 0; break;
                case 'left': object.postion.xPos = 0; break;
                case 'bottom': object.postion.yPos = object.game.canvas.height - object.design.height; object.speedY = 0;
                    object.speedY = 0;
                    // this.gravity = 0;
                    break;
                case 'top': object.postion.yPos = 0; break;
            }
            return true;
        }
        if (this.barriers.items.length > 0) {
            this.barriers.items.forEach(obj => {
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
            case 'top': object.postion.yPos = barrier.postion.yPos - object.design.height; break;
            case 'bottom': object.postion.yPos = barrier.postion.yPos + barrier.design.height; break;
            case 'right': object.postion.xPos = barrier.postion.xPos + barrier.design.width; break;
            case 'left': object.postion.xPos = barrier.postion.xPos - object.design.width; break;
        }
    }
    crashWithSide(currentObj: ObjectComponent, otherobj: ObjectComponent): string {
        let myleft = currentObj.postion.xPos;
        let myright = currentObj.postion.xPos + (currentObj.design.width);
        let mytop = currentObj.postion.yPos;
        let mybottom = currentObj.postion.yPos + (currentObj.design.height);
        let otherleft = otherobj.postion.xPos;
        let otherright = otherobj.postion.xPos + (otherobj.design.width);
        let othertop = otherobj.postion.yPos;
        let otherbottom = otherobj.postion.yPos + (otherobj.design.height);
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
                    res.speedY = 0;
                }
            }
        }
    }
        )
    }

}