import { Component, OnInit } from '@angular/core';
import { IDesign } from '../game.models';
export class ObjectDesign implements IDesign {
    image: HTMLImageElement;
    color: string;
    shape: string; // is type text/circle/image/sqaure
    height: any;
    width: any;
    text: string;
    centerY: number;
    centerX: number;
    radius: number;
    constructor(width: any, height: any, shape: string, color: string, image?: any, text?: string) { 
        this.image = image;
        this.width = width;
        this.height = height;
        this.shape = shape;
        this.color = color;
        this.centerY = this.height / 2;
        this.centerX = this.width / 2;
        let first = this.centerY + this.centerX;
        this.radius = first / 2;
         if (shape === 'image') {
            this.image = new Image();
            this.image.src = color;
        }
    }

}