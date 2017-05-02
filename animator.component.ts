import { Component, OnInit } from '@angular/core';
import { IFrameItem, IAnimation, IGameObject } from './game.models';
export class Animation implements IAnimation {
    length: number;
    loop: boolean;
    speed: number;
    frame: number = 0;
    frameItems: any[] = [];
    baseObject: IGameObject;
    private interval: any;
    constructor(length: number, loop: boolean, speed: number) {
        this.length = length;
        this.loop = loop;
        this.speed = speed;
        for (let i = 0; i <= this.length; i++) {
            this.frameItems.push('')
        }
    }

    addObject(frame: number, item: IGameObject) {
        item.x = this.
        let newItem: IFrameItem = {
            frame: frame,
            object: item
        }
        this.frameItems[frame] = newItem;
        this.fillTimeline(newItem);
    }
    start() {
        this.interval = setInterval(() => { this.animationScript() }, this.speed);
    }

    stop() {
        clearInterval(this.interval);
    }

    animationScript() {
        if (this.loop === false) {
            if (this.frame === this.length) {
                this.stop();
            }
        } else {
            if (this.frame === this.length) {
                this.frame = 0;
            }
        }
        this.frame = this.frame + 1;
        console.log(this.frameItems[this.frame]);
        this.frameItems[this.frame].object.update(true);

    }
    fillTimeline(object: IFrameItem) {
        let nextItem = this.getNextItemFrame(object)
        let currentItemFrame = object.frame;
        let difference: number;
        if (nextItem) {
            difference = nextItem.frame - currentItemFrame;
        } else {
            difference = this.frameItems.length - currentItemFrame;
        }
        for (difference; difference >= 0; difference--) {
            currentItemFrame = currentItemFrame + 1;
            console.log(difference);
            this.frameItems[currentItemFrame] = object;
        }
        console.log(this.frameItems);
    }
    // checkCurrentObject() {
    //     this.frameItems.forEach(object => {
    //         if(object === '') {
    //             return;
    //         } else {
    //         let nextItem = this.getNextItemFrame(object);
    //         console.log('first: ' + object.frame)
    //         if(nextItem){
    //             console.log('next: ' + nextItem.frame);
    //         if(object.frame < this.frame && nextItem.frame > this.frame) {
    //             console.log(object);
    //             this.currentObject = object.object;
    //         }
    //     } else {
    //         console.log(object);
    //         this.currentObject = object.object;
    //     }
    //     }
    //     })
    // }
    getNextItemFrame(object: IFrameItem): IFrameItem {
        let items = this.frameItems.slice(object.frame + 1, this.length);
        let end = true;
        let i = 0;
        let item: any;
        for (end; end; i++) {
            if (!(items[i] === '')) {
                item = items[i]
                end = false;
                return items[i];
            }
        }
    }


    // everyinterval(frames: number) {
    //     if ((this.frame / frames) % 1 === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}