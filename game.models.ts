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
    // update: (barrier?, ground?) => void;
    shoot: (x, y, speed, object) => void;
}
