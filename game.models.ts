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
    everyinterval(frames: number);
}
export interface IPath {
    x: number,
    y: number
    speed: number
}

export interface IGameObject {
    width: number;
    height: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    gravity: number;
    gravitySpeed: number;
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
}
