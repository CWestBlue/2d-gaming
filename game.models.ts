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
    type: string;
    image: any;
    middle: boolean;
    color: any;
    src: boolean;
    score: number;
    path: IPath;
    text: any;
    maxWidth: any;
    newPos: (barrier, ground) => void;
    update: (barrier, ground) => void;
    hitGround: (game, ground?) => boolean;
    crashWith: (object) => boolean;
    travelpath: () => void;
}
