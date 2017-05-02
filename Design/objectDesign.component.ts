import { Component, OnInit } from '@angular/core';
import { IDesign } from '../game.models';
export class ObjectDesign implements IDesign {
    image: HTMLImageElement;
    color: string;
    shape: string;
    height: number;
    width: number;
    text: string;
    centerY: number;
    centerX: number;
    radius: number;
    constructor(width: number, height: number, shape: string, color: string, image?: any, text?: string) { 
        this.image = image;
        this.width = width;
        this.height = height;
        this.shape = shape;
        this.color = color;
        this.centerY = this.height / 2;
        this.centerX = this.width / 2;
        let first = this.centerY + this.centerX;
        this.radius = first / 2;
    }

}