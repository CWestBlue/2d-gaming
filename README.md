# 2d-gaming

### Description
This is an Angular package fo developing 2d games in angular.
[Please Give Feedback Here](https://cwestblue.github.io/deployWeb/forms).

######Side Note
I just started working on my website.

### Installing
1. Run npm instll 2d-gaming
2. Import { TwoDGaming } from '2d-gaming'; Into your module
3. Import { GameAreaObject, ObjectComponent } from '2d-gaming' into the file of your game.


### Getting Started
##### Setup your game
1. Setup your game area. Each area object will have a name, width, height and gravity.
```typescript
    import { GameAreaObject, ObjectComponent } from '2d-gaming';

    @Component({
    selector: 'app-game',
    templateUrl: './space.component.html'
    })
    export class GameComponent implements OnInit{    
        gameArea: GameAreaObject;
        

        ngOnInit() {                   // Name         Width     Height
            this.gameArea = new GameAreaObject('angryBook', '300px', '300px'); 
            // this is your gameArea plane
            this.gameArea.gravity = 0; // Can set the gravity of your gameArea
        }
    };
  ```
  ```html
  <!--- In html place this tag -->
  <app-game-area></app-game-area>
  ```
2. Now you can add a player. The ObjectComponent takes in a gameAreaObject, wdith, height, color or image url, x position, y position, a type (color/image/text).
  ```typescript
    player: ObjectComponent;
    // now inside your ngOnInit;
    this.player = 
    new ObjectComponent(this.gameArea, 20, 20, 'green', 150, 150, this.gameArea, 'color');
     // Create a play with ObjectComponent
    // This is (gameAreaObject/areaName, width, height, color or image url, x      pos, y pos, ofType color or image)

  ```

3.  We need to create an update game function that will run ever frame rate. The reason we do this is an object add to the game plane will not be updated for example the previous spot. It would just add a second one.
  ```typescript
  // place this inside ngOnInit
    this.gameArea.doEveryFrame = (() => this.updateGameArea)

    updateGameArea() {
        this.gaemArea.clear();
        this.gameArea.frame += 1;
        this.player.update(true); // reDraws the player. It can also take  a groundObject, and  true or false if you want barriers. 
    }
  ```
4. Now Start your Game.
  ```typescript
    // Create a start function
     start() {
         this.gameArea.start() // This will start the game frames
     }
  ```
  ``` html
    // Inside your html add this
    <button (click)="start()"></button>
  ```

5. Lets give our player movement. object.speedX & speedY move the object in that direction of y or x until set to 0.
  ```typescript
     @HostListener('document:keyup', ['$event'])

    onKeyup(e: KeyboardEvent) {
        const code = e.keyCode;
        player.speedX = 0;
    }

    @HostListener('document:keydown', ['$event'])

    onkeydown(e: KeyboardEvent) {
        const code = e.keyCode;
        // D Key
      if (code === 68) {
          this.player.speedX = 1.5; // move right
      }
      // A Key
      if (code === 65) {
          this.player.speedX = -1.5; //move left
      }
      // W Key
      if (code === 87) {
          this.player.speedY = -1.5; // move up
      }
      // S Key
      if (code === 83) {
          this.player.speedY = 1.5; // move down
      }
    }
  ```
  6. Lets add an object that will move from one point to another. To do this we set object.path. The path object has a x and y value for the points you want your object to move to.
  ```typescript
    let movingObject = new ObjectComponent(this.gameArea, 20, 20, "red", 100, 100, 'color' );
    movingObject.path = {
        x: 200,
        y: 200,
        speed: 1
    }
    // Now inside the updateGameArea function
    updateGameArea() {
        this.gaemArea.clear();
        this.gameArea.frame += 1;
        this.movingObject.update(true); // Add this line to update the objects movement
        this.player.update(true); // reDraws the player. It can also take  a true or false if you want barriers.


    }

  ```
### ObjectComponent
|  Call      | Description         | Paramaters |
| ----       |:-------------------:| ----------:|
| .update()  | redraws the image   | barrier=true/false, groundObject|
| .add()     | adds a barrier to the object |   objectComponent |
| .hitBarrier() | Checks if the object hit a barrier | none |
| .crashWith() | checks if hits another object | otherObject |
| .shoot()     | shoots an object | objectComponent |
| .jump() | Object will jump if gravity | speed: number |


| name      | Description       |
| --------- | ----------------- |
| width     | width of object   |
| height    | height of object  |
| x         | x postion on plane|
| y         | y postion on plane|
| speedX    | speed on the x axis |
| speedY    | speed on the y axis |
| text | text of object if it is of type text |
| path | creates a path for the object to travel to. Object that has x, y and speed properties|

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

    

