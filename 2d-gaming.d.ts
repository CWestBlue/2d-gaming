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
	}
	export interface IGameObject {
	    width: number;
	    height: number;
	    x: number;
	    y: number;
	    speedX: number;
	    speedY: number;
	    gravity: number;
	    ctx: CanvasRenderingContext2D;
	    type?: string;
	    image: any;
	    color: any;
	    score: number;
	    path: IPath;
	    text: any;
	    update: (barrier, ground) => void;
	    crashWith: (object) => boolean;
	    shoot: (x, y, speed, object) => void;
	    jump: (speed: number) => void;
	    radius: number;
	}

}
declare module '2d-gaming/game-area.view.component' {
	import { OnInit } from '@angular/core';
	export class TwoDGaming implements OnInit {
	    constructor();
	    ngOnInit(): void;
	}

}
declare module '2d-gaming' {
	export * from '2d-gaming/game-area.object';
	export * from '2d-gaming/game.objects.component';
	export * from '2d-gaming/game.models';
	export * from '2d-gaming/game-area.view.component';

}
declare module '2d-gaming/game.objects.component' {
	import { GameAreaObject } from '2d-gaming/game-area.object';
	import { IPath, IGameObject } from '2d-gaming';
	export class ObjectComponent implements IGameObject {
	    width: number;
	    height: number;
	    x: number;
	    y: number;
	    speedX: number;
	    speedY: number;
	    origin: ObjectComponent;
	    private barriers;
	    gravity: number;
	    bullets: ObjectComponent[];
	    ctx: CanvasRenderingContext2D;
	    private isShoot;
	    image: any;
	    type: string;
	    color: any;
	    score: number;
	    path: IPath;
	    text: any;
	    game: GameAreaObject;
	    radius: number;
	    constructor(game: GameAreaObject, width: any, height: any, look: string, xPos: number, yPos: number, type: string, radius?: number);
	    private newPos(barrier?);
	    private typeOf();
	    add(barrier: ObjectComponent): void;
	    private hitBarrier();
	    private travelpath();
	    jump(n: any): void;
	    shoot(x: any, y: any, speed: any, object: ObjectComponent): void;
	    update(barrier?: any, ground?: any): void;
	    private create(type);
	    crashWith(otherobj: any): boolean;
	    leavesWith(): any;
	}

}
declare module '2d-gaming/game-area.object' {
	import { IGameArea } from '2d-gaming/game.models';
	import { ObjectComponent } from '2d-gaming/game.objects.component';
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
	    gameObjects: ObjectComponent[];
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
	export class TwoDGamingModule {
	}

}
/* SystemJS module definition */
declare var module: {
  id: string;
};
