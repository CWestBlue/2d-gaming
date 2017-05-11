import { Component, OnInit } from '@angular/core';
import { ObjectArray } from './ammo.component'
export class UpdateHandler {
    constructor(public objects: any[]) {
     }

     update() {
         if(this.objects){
         this.objects.forEach(object => {
            object.draw();
             object.updateMovement();
         })
        }
     }
}