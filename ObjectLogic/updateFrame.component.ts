import { Component, OnInit } from '@angular/core';
import { ObjectArray } from './ammo.component'
export class UpdateHandler {
    constructor(public objects: ObjectArray) {
     }

     update() {
         this.objects.items.forEach(object => {
             object.draw();
             object.updateMovement();
         })
     }
}