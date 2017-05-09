# 2d-gaming

### Description
This is an Angular package fo developing 2d games in angular.
[Please report issues/questions/any ideas to better help this package](https://github.com/CWestBlue/2d-gaming/issues).


### Installing
1. Run npm instll 2d-gaming
2. Import { TwoDGaming } from '2d-gaming'; Into your module
3. Import { GameAreaObject, ObjectComponent, ObjectDesign, PositionObject } from '2d-gaming' into the file of your game.


### Getting Started
##### Setup your game
1. Setup your game area. Each area object will have a name, width, height and gravity.
###### First Create Your Game Object
```typescript
    // Create A New File gameArea.ts
    import { GameAreaObject } from '2d-gaming';

    export class GameArea implements OnInit{

        component: GameAreaObject;

        constructor() {
            this.component = new GameAreaObject('myGame', '300px', '300px');
            this.game.gravity = 0;
        }
    };
  ```
  ###### Then SetUp Your Object In Your Component
  ```typescript
  // Create A New File game.component.ts
    import {GameAreaObject, ObjectComponent, ObjectDesign, PositionObject, ObjectArray } from '2d-gaming';
    import {GameArea} from './gameArea.ts':
    @Component({
        selector: 'app-game',
        templateUrl: './game.html'
    })

    export class GameComponent implements OnInit {
        gameObject: GameArea

        ngOnInit() {
            this.gameObject = new GameArea();
            this.gameObject.gamedoEveryFrame = (() => this.doPerFrame());
        }

        start() {
            this.gameObject.component.start(); // this starts the game
        }

        stop() {
            this.gameObject.component.stop(); // this stops and resets the game
        }

        doPerFrame() {
            // put code here you want to run everyFrame
        }
    }

  ```
  ```html
  <!--- In game.html Place This-->
  <app-game-area></app-game-area>
  <button (click)="start()">Start</button>
  ```
2. Now lets add a player.
  ```typescript
  // Create A New File player.ts
    import {GameAreaObject, ObjectComponent, ObjectDesign, PositionObject } from '2d-gaming'

    export class Player {
        component: ObjectComponent;
        position: PositionObject;
        design: ObjectDesign;

        constructor(public game: GameAreaObject) {
            this.design = new ObjectDesign(20, 20, 'square', 'green'); // create a design. we will add this to our player
            this.position = new PositionObject(150, 150); // create a position object. we will add this to our player
            this.component = new ObjectComponent(this.game, this.design, this.position) // add the design and position to the player.
            // we inject a gameObject into the constructor so the player can know what game it belongs to
        }
    }

  ```
  ##### Now SetUp the player in the component
  ```typescript
    // back in game.component.ts
    gameObject: GameArea;
    playerObject: Player; //Import Player from the previous file

    ngOnInit() {
        this.gameObject = new GameArea();
        this.playerObject = new Player(this.gameObject.component); // Create a new Instance of it and inject the component of the gameObject in its constructor
    }
  ```

3. Lets give our player movement.
  ```typescript
  // Im using HostListener. You can use another event detection if you pefer
     @HostListener('document:keyup', ['$event'])

    onKeyup(e: KeyboardEvent) {
        const code = e.keyCode;
        this.playerObject.component.movement.clearMovement();
    }

    @HostListener('document:keydown', ['$event'])

    onkeydown(e: KeyboardEvent) {
        const code = e.keyCode;
        // D Key
      if (code === 68) {
          this.playerObject.component.movement.moveRight(1.5); // move right
      }
      // A Key
      if (code === 65) {
          this.playerObject.component.movement.moveLeft(1.5); //move left
      }
      // W Key
      if (code === 87) {
          this.playerObject.movement.moveUp(1.5); // move up
      }
      // S Key
      if (code === 83) {
          this.playerObject.component.movement.moveDown(1.5); // move down
      }
    }
  ```
  4. Lets add an object that will move from one point to another. To do this we set object.path. The path object has a x and y value for the points you want your object to move to.
  ```typescript
  // Create a new file item.ts
  import {GameAreaObject, ObjectComponent, ObjectDesign, PositionObject, IPath } from '2d-gaming'

    export class item {
        component: ObjectComponent;
        position: PositionObject;
        design: ObjectDesign;

        constructor(public game: GameAreaObject) {
            this.design = new ObjectDesign(20, 20, 'square', 'red'); // create a design. we will add this to our object
            this.position = new PositionObject(100, 100); // create a position object. we will add this to our object
            this.component = new ObjectComponent(this.game, this.design, this.position) // add the design and position to the object.
            // we inject a gameObject into the constructor so the object can know what game it belongs to
            this.component.movement.newPath = {
                x: 200, // New X Pos
                y: 200, // New Y Pos
                speed: 1, // Speed It Moves At
                infinit: false // If it stops at designated location or continue after
            }
        }
    }
  ```
  ##### add the object to our component
  ```typescript
    gameObject: GameArea;
    playerObject: Player; //Import Player from the previous file
    movingObject: item; //Import item from the previous file

    ngOnInit() {
        this.gameObject = new GameArea();
        this.playerObject = new Player(this.gameObject.component); // Create a new Instance of it and inject the component of the gameObject in its constructor
        this.movingObject = new item(this.gameObject.component)
    }
  ```
  ##### Now Run And click Start
### ObjectComponent
|  Call      | Description         | Paramaters |
| ----       |:-------------------:| ----------:|
| draw()   | draws the object on the canvas | none|
| shoot()   | shoots the bullets | none |


| name      | Description       |
| --------- | ----------------- |
| game     | the gameArea it belongs to   |
| design    | a designObject  |
| position  | a PositionObject |
| movement | a Movement Object |
| bullets  | items your wanting to shoot|
| score    | how points stored in this object |
| isBarrier | if object is a barrier |

### DesignObject
| Name      | Description       |
| --------- | ----------------- |
| shape     | is type image, square, circle, text|
| width     | width of the connected object |
| height    | height of the connected Object |
| color     | is a color unless shape is image then is an image url|
| text      | the text of an text shape |

### PositionObject
| Name  | Description |
| ----- | ----------- |
| xPos  | x position  |
| yPos  | y position  |

### MovementObject
| Name    | Description       |
| ------- | ----------------- | 
| speedY  | the speed of the object on the y axis| 
| speedX  | speed of object on x axis |
| gravity | gravity of object |
| position | a PositionObject |

| Name    | Description       | paramater |
| ------- | ----------------- | --------- |
| moveright() | moves object right | speed: number |
| moveLeft() | moves object left | speed: number |
| moveUp()  | moves object up | speed: number |
| moveDown() | moves object down | speed: number |
| newPos    | moves object to new location | xPos: number, yPos: number, speed: number, infinit: boolean |

### GameComponent
| call      | Description         | Paramaters  |
| --------  | ------------------- | ----------- |
| .start()  | starts the game     |      none       |
| stop()    | stops the game |  none |
| .clear() | clears the game area | none |
| .doEveryFrame() | runs every frame | function |
| .everyinterval() | returns true or false. Do somthing every interval | number for when you want the interval to be set at |

| name       | Description      |
| ---------- | ---------------- |
| frame      | the current frame your on |
| area       | The element container of the game |
| gravity    | the gravity of the game |
| crashHandler| handles collides in game |
| height    | height of the game |
| width     | width of the game |
| gameObjects | all objects in game |
| name        | name of the game |

