# 2d-gaming

### Description
This is an Angular package fo developing 2d games in angular.
[Please Give Feedback Here](https://cwestblue.github.io/deployWeb/forms).

######Side Note
I just started working on my website.

### Installing
1. Run npm instll 2d-gaming
2. Import { TwoDGamingModule } from '2d-gaming'; Into your module
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
        this.player.update(true); // reDraws the player. It can also take  a groundObject, and  true or false if you want barriers. 
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
  5. Lets add an object that will move from one point to another. To do this we set object.path. The path object has a x and y value for the points you want your object to move to.
  ```typescript
    let movingObject = new ObjectComponent();
    movingObject.create(20, 20, "red", 100, 100, this.gameArea, "color");
    movingObject.path = {
        x: 200,
        y: 200
    }
    // Now inside the updateGameArea function
    updateGameArea() {
        this.gaemArea.clear();
        this.gameArea.frame += 1;
        this.movingObject.update(true); // Add this line to update the objects movement
        this.player.update(true); // reDraws the player. It can also take  a true or false if you want barriers and a groundObject if you have one.


    }

  ```
### ObjectComponent
|  Call      | Description         | Paramaters |
| ----       |:-------------------:| ----------:|
| .update()  | redraws the image   | barrier=true/false, groundObject|
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
| path | creates a path for the object to travel to. Object that has x and y properties|

### GameComponent
| call      | Description         | Paramaters  |
| --------  | ------------------- | ----------- |
| .config() | configures and initalizes the game area | attribute object |
| stop()    | stops the game | background object, player object, objects[]? ground object? |
| .clear() | clears the game area | none |

| name       | Description      |
| ---------- | ---------------- |
| frame      | the current frame your on |
| area       | The element container of the game |
| gravity    | the gravity of the game |

    

