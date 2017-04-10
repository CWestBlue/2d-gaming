# 2d-gaming

### Description
This is an Angular package fo developing 2d games in angular.


### Installing
1. Run npm instll 2d-gaming
2. Import { TwoDGaming } from '2d-gaming'; Into your module
3. Import { GameAreaComponent, ObjectComponent } from '2d-gaming' into the file of your game.


### Getting Started
##### Setup your game
1. Configure your game area by using .config. Each area object will have a name, width, height and gravity.
```typescript
    import { GameAreaComponent, ObjectComponent } from '2d-gaming';

    @Component({
    selector: 'app-game',
    templateUrl: './space.component.html'
    })
    export class GameComponent {
    gameArea = new GameAreaComponent(); // Your game plane
    attributes = {
    name: 'angryBook';
    width: '300px';
    height: '300px';
    gravity: 0;
    } // the attributes each plane will have
    this.gameArea.congfig(attributes) // initializes the plane
    };
  ```
  ```html
  <!--- In html place this tag -->
  <app-game-area></app-game-area>
  ```
  2. Now you can add a player. The ObjectComponent.create() takes in a width, height, color or image url, x position, y position, a gameAreaObject, what type it is color or image.
  ```typescript
    this.player = new ObjectComponent(); // a player created out of object
    this.player.create(20, 20, 'green', 150, 150, this.gameArea, 'color');
    // This is (width, height, color or image url, x pos, y pos, gameAreaObject/areaName, ofType color or image)

  ```

  3.  We need to create an update game function that will run ever frame rate. The reason we do this is an object add to the game plane will not be updated for example the previous spot. It would just add a second one.
  ```typescript
    setInterval(() => this.updateGameArea(), 20)

    updateGameArea() {
        this.gaemArea.clear();
        this.gameArea.frame += 1;
        this.player.newPos(false, true) 
        // This is (customGroundObject, barrier arround the area) updates the players pos
        this.player.update(); // reDraws the player
    }
  ```
  4. Lets give our player movement. object.speedX & speedY move the object in that direction of y or x until set to 0.
  ```typescript
     @HostListener('document:keyup', ['$event'])

    onKeyup(e: KeyboardEvent) {
        const code = e.keyCode;
        switch (code) {
          case 37: this.player.speedX = 0; break;
          case 39: this.player.speedX = 0; break;
          case 38: this.player.speedY = 0; break;
          case 40: this.player.speedY = 0; break;
        }
    }

    @HostListener('document:keydown', ['$event'])

    onkeydown(e: KeyboardEvent) {
        const code = e.keyCode;
        // Right Arrow
      if (code === 39) {
          this.player.speedX = 1.5; // move right
      }
      // Left Arrow
      if (code === 37) {
          this.player.speedX = -1.5; //move left
      }
      // Up Arrow
      if (code === 38) {
          this.player.speedY = -1.5; // move up
      }
      // Down Arrow
      if (code === 40) {
          this.player.speedY = 1.5; // move down
      }
    }
  ```
### GameComponent
|  Call      | Description         | Paramaters |
| ----       |:-------------------:| ----------:|
| .update()  | redraws the image   | groundObject barrier=true/false|
| .newPos()  | updates the pos of the image | none |
| .hitGround() | Checks if the object is on the ground | areaObject ground object |
| .crashWith() | checks if hits another object | otherObject |


| name      | Description       |
| --------- | ----------------- |
| width     | width of object   |
| height    | height of object  |
| x         | x postion on plane|
| y         | y postion on plane|
| speedX    | speed on the x axis |
| speedY    | speed on the y axis |
| gravitySpeed | the rate of failling speed increases |
| text | text of object if it is of type text |

    

