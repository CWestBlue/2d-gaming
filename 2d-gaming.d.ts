declare module '2d-gaming/game.models' {
	export interface IGameArea {
	    name?: string;
	    width?: string;
	    height?: string;
	    gravity: number;
	    canvas: HTMLCanvasElement;
	    context: CanvasRenderingContext2D;
	    interval?: any;
	    frame: number;
	    area: HTMLElement;
	    start: () => void;
	    doEveryFrame: () => void;
	    stop: (sky, player, objects?, ground?) => void;
	    clear: () => void;
	    everyinterval(frames: number): any;
	}
	export interface IPath {
	    x: number;
	    y: number;
	    speed: number;
	    infinit: boolean;
	}
	export interface IFrameItem {
	    object: IGameObject;
	    frame: number;
	}
	export interface IAnimation {
	    length: number;
	    loop: boolean;
	    speed: number;
	    frameItems: IFrameItem[];
	    start: () => void;
	}
	export interface IMovement {
	}
	export interface IGamePhysics {
	    gravity: number;
	    windStrength: number;
	    windDirection: string;
	}
	export interface IDesign {
	    image: any;
	    color: string;
	    shape: string;
	    height: any;
	    width: any;
	}
	export interface IGameObject {
	    ctx: CanvasRenderingContext2D;
	    score: number;
	    shoot: (x, y, speed, object) => void;
	}

}
declare module '2d-gaming/animator.component' {
	import { IFrameItem, IAnimation, IGameObject } from '2d-gaming/game.models';
	export class Animation implements IAnimation {
	    length: number;
	    loop: boolean;
	    speed: number;
	    frame: number;
	    frameItems: any[];
	    baseObject: IGameObject;
	    private interval;
	    constructor(length: number, loop: boolean, speed: number);
	    addObject(frame: number, item: IGameObject): void;
	    start(): void;
	    stop(): void;
	    animationScript(): void;
	    fillTimeline(object: IFrameItem): void;
	    getNextItemFrame(object: IFrameItem): IFrameItem;
	}

}
declare module '2d-gaming/game-area.view.component' {
	import { OnInit } from '@angular/core';
	export class TwoDGaming implements OnInit {
	    constructor();
	    ngOnInit(): void;
	}

}
declare module '2d-gaming/ObjectLogic/postion.component' {
	export class PositionObject {
	    xPos: number;
	    yPos: number;
	    constructor(xPos: number, yPos: number);
	}

}
declare module '2d-gaming/ObjectLogic/movement.component' {
	import { IPath } from '2d-gaming/game.models';
	import { PositionObject } from '2d-gaming/ObjectLogic/postion.component';
	export class MovementComponent {
	    position: PositionObject;
	    newPos: IPath;
	    speedY: number;
	    speedX: number;
	    gravity: number;
	    constructor(position: PositionObject, newPos?: IPath);
	    moveRight(speed: any): void;
	    moveLeft(speed: any): void;
	    moveUp(speed: any): void;
	    moveDown(speed: any): void;
	    updateMovement(): void;
	    private travelpath();
	}

}
declare module '2d-gaming/ObjectLogic/ammo.component' {
	import { ObjectComponent } from '2d-gaming/game.objects.component';
	export class ObjectArray {
	    item: ObjectComponent;
	    howMany: number;
	    items: ObjectComponent[];
	    constructor(item?: ObjectComponent, howMany?: number);
	    multiply(): void;
	    update(): void;
	    removeFromGame(): void;
	    add(item: ObjectComponent): void;
	    addMulti(items: ObjectComponent[]): void;
	}

}
declare module '2d-gaming/ObjectLogic/updateFrame.component' {
	import { ObjectArray } from '2d-gaming/ObjectLogic/ammo.component';
	export class UpdateHandler {
	    objects: ObjectArray;
	    constructor(objects: ObjectArray);
	    update(): void;
	}

}
declare module '2d-gaming/ObjectLogic/crashLogic.component' {
	import { ObjectComponent } from '2d-gaming/game.objects.component';
	import { ObjectArray } from '2d-gaming/ObjectLogic/ammo.component';
	export class CrashComponent {
	    object: ObjectArray;
	    barriers: ObjectArray;
	    constructor(object: ObjectArray, barriers: ObjectArray);
	    private hitBarrier(object);
	    addClip(side: string, object: ObjectComponent, barrier: ObjectComponent): void;
	    crashWithSide(currentObj: ObjectComponent, otherobj: ObjectComponent): string;
	    leavesWith(object: ObjectComponent): any;
	    newPos(barrier?: any): void;
	}

}
declare module '2d-gaming/Design/objectDesign.component' {
	import { IDesign } from '2d-gaming/game.models';
	export class ObjectDesign implements IDesign {
	    image: HTMLImageElement;
	    color: string;
	    shape: string;
	    height: any;
	    width: any;
	    text: string;
	    centerY: number;
	    centerX: number;
	    radius: number;
	    constructor(width: any, height: any, shape: string, color: string, image?: any, text?: string);
	}

}
declare module '2d-gaming' {
	export * from '2d-gaming/game-area.object';
	export * from '2d-gaming/game.objects.component';
	export * from '2d-gaming/game.models';
	export * from '2d-gaming/game-area.view.component';
	export * from '2d-gaming/animator.component';
	export * from '2d-gaming/ObjectLogic/movement.component';
	export * from '2d-gaming/ObjectLogic/postion.component';
	export * from '2d-gaming/ObjectLogic/updateFrame.component';
	export * from '2d-gaming/ObjectLogic/crashLogic.component';
	export * from '2d-gaming/ObjectLogic/ammo.component';
	export * from '2d-gaming/Design/objectDesign.component';

}
declare module '2d-gaming/game.objects.component' {
	import { GameAreaObject } from '2d-gaming/game-area.object';
	import { IGameObject } from '2d-gaming';
	import { ObjectDesign } from '2d-gaming/Design/objectDesign.component';
	import { MovementComponent } from '2d-gaming/ObjectLogic/movement.component';
	import { ObjectArray } from '2d-gaming/ObjectLogic/ammo.component';
	import { PositionObject } from '2d-gaming/ObjectLogic/postion.component';
	export class ObjectComponent implements IGameObject {
	    game: GameAreaObject;
	    design: ObjectDesign;
	    postion: PositionObject;
	    isBarrier: boolean;
	    origin: ObjectComponent;
	    private barriers;
	    bullets: ObjectArray;
	    ctx: CanvasRenderingContext2D;
	    startingPos: PositionObject;
	    private update;
	    score: number;
	    movement: MovementComponent;
	    constructor(game: GameAreaObject, design: ObjectDesign, postion: PositionObject, isBarrier: boolean, isObjectDependent: boolean);
	    draw(): void;
	    shoot(x: any, y: any, speed: any, object: ObjectComponent): void;
	    private create();
	}

}
declare module '2d-gaming/GameAreaLogic/object-category-setter' {
	import { ObjectArray } from '2d-gaming/ObjectLogic/ammo.component';
	export class GameObjectCategory {
	    gameObjects: ObjectArray;
	    barriers: ObjectArray;
	    nonBarriers: ObjectArray;
	    constructor(gameObjects: ObjectArray);
	    set(): void;
	    clear(): void;
	}

}
declare module '2d-gaming/game-area.object' {
	import { IGameArea } from '2d-gaming/game.models';
	import { ObjectArray } from '2d-gaming/ObjectLogic/ammo.component';
	import { CrashComponent } from '2d-gaming/ObjectLogic/crashLogic.component';
	import { UpdateHandler } from '2d-gaming/ObjectLogic/updateFrame.component';
	import { GameObjectCategory } from '2d-gaming/GameAreaLogic/object-category-setter';
	export class GameAreaObject implements IGameArea {
	    name: string;
	    width: string;
	    height: string;
	    doEveryFrame: () => void;
	    gravity: number;
	    canvas: HTMLCanvasElement;
	    context: CanvasRenderingContext2D;
	    frame: number;
	    private startOn;
	    interval: any;
	    crashHandler: CrashComponent;
	    update: UpdateHandler;
	    gameObjects: ObjectArray;
	    splitter: GameObjectCategory;
	    area: HTMLElement;
	    constructor(name: string, width: string, height: string);
	    start(): void;
	    clear(): void;
	    stop(): void;
	    everyinterval(frames: number): boolean;
	}

}
declare module '2d-gaming/game.module' {
	export { TwoDGaming } from '2d-gaming/game-area.view.component';
	export { GameAreaObject } from '2d-gaming/game-area.object';
	export { Animation } from '2d-gaming/animator.component';
	export class TwoDGamingModule {
	}

}
/* SystemJS module definition */
declare var module: {
  id: string;
};
declare module '2d-gaming/ObjectLogic/logic.component' {
	export class LogicComponent {
	    constructor();
	}

}
