/*
*******************
*******Enemy*******
*******************
*/
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    "use strict";
    // Variables applied to each of our instances go here

    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //reset enemy with fresh speed after going off screen
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    this.checkCollision();
};

/*
Speed multiplier for difficulty - courtesy of https://github.com/ncaron/frontend-nanodegree-arcade-game/blob/master/js/app.js
*/
var speedMultiplier = 40;

//random speed set
Enemy.prototype.randomSpeed = function(){
  "use strict";
  //pick a random number from 1-10 and mult by speedMultiplier
  this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
}
// Draw the enemy on the screen, required method for game
//combined with scoreboard programming - courtesy https://discussions.udacity.com/t/having-trouble-displaying-the-score/26963

Enemy.prototype.render = function() {
  "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + player.playerScore, 40, 70);
    ctx.fillText("Lives: " + player.playerLives, 141, 70);
    ctx.fillText("Difficulty: " + speedMultiplier, 260, 70);
};

//collision logic
//courtesy https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function(){
  "use strict";
  //hitbox setup
  var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
  var enemyBox = {x: this.x, y: this.y, width:60, height: 70};
  //check collision - if playerBox enters enemyBox = collision = 1
  if (playerBox.x < enemyBox.x + enemyBox.width &&
      playerBox.x + playerBox.width > enemyBox.x &&
      playerBox.y < enemyBox.y + enemyBox.height &&
      playerBox.height + playerBox.y > enemyBox.y){
        //call collisionDetected function if collision = true
        this.collisionDetected();
      }
};

//collision detected, subtract one life and reset player to start
  Enemy.prototype.collisionDetected = function(){
    "use strict";
    player.playerLives -= 1;
    player.characterReset;
  };

  /*
  *******************
  *******Player******
  *******************
  */

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  "use strict";
  this.startingX = 200;
  this.startingY = 400;
  this.x = this.startingX;
  this.x = this.startingY;
  this.sprite = 'images/char-boy.png';
  this.playerScore = 0;
  this.playerLives = 2;
};

//reset if lives = 0
Player.prototype.update = function(){
  "use strict";
  if (this.playerLives === 0){
    rest();
  }
};

//reset to start
Player.prototype.characterReset = function(){
  "use strict";
  this.startingX = 200;
  this.startingY = 400;
  this.x = this.startingX;
  this.y = this.startingY;
};

//increment score, up difficulty upon reaching water
Player.prototype.success = function(){
  "use strict";
  this.playerScore += 20;
  speedMultiplier += 5;
  this.characterReset();
};

//render player
Player.prototype.render = function(){
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player control
Player.prototype.handleInput = function(allowedKeys) {
    "use strict";
    switch (allowedKeys) {
        case "left":
            //check for edge, otherwise move left
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            //check for edge, otherwise move right
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":
            //check if player reached edge of water, if so call success function,
            // otherwise move up
            if (this.y < 0) {
                this.success();
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            //check for edge, otherwise move down
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
