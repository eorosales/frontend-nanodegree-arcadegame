// Enemies our player must avoid
var Enemy = function(loc) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = 0;
  this.y = ((loc * 85) + 60);
  this.speed = Math.random();
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.width = 70;
  this.height = 65;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed + (dt * 200);
    if(this.x > 500) {
      this.x = this.x - 671;
      this.x += Math.random() + (dt * 200);
    }
    if(detectCollision()) {
      player.x = 200;
      player.y = 400;
    }
};
// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class

var Player = function() {
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/char-boy.png';
  this.height = 76;
  this.width = 67;
}

// Methods shared for all Player objects
Player.prototype.moveLEFT = function() {
  this.x -= 100;
  if(this.x < 0) {
    this.x = 0;
  }
}

Player.prototype.moveUP = function() {
  this.y -= 85;
  if(this.y < 0) {
    this.y = 400;
  }
}

Player.prototype.moveDOWN = function() {
  this.y += 85;
  if(this.y > 400) {
    this.y = 400;
  }
}

Player.prototype.moveRIGHT = function() {
  this.x += 100;
  if(this.x > 400) {
    this.x = 400;
  }
}

Player.prototype.handleInput = function(allowedKeys) {
  switch(allowedKeys) {
    case 'up':
      this.moveUP();
      break;
    case 'down':
      this.moveDOWN();
      break;
    case 'left':;
      this.moveLEFT();
      break;
    case 'right':
      this.moveRIGHT();
      break;
    default:
      console.log('not an allowed key');
  }
}

Player.prototype.update = function(dt) {
};

Player.prototype.render = function(dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var detectCollision = function() {
  var collision = false;
  for(var i = 0; i < allEnemies.length; i++) {
    if(allEnemies[i].x < player.x + player.width &&
       allEnemies[i].x + allEnemies[i].width > player.x &&
       allEnemies[i].y < player.y + player.height &&
       allEnemies[i].height + allEnemies[i].y > player.y) {
         collision = true;
     }
  }
  if(collision === true) {
    return true;
  }else {
    return false;
  }
}

// Instatiate objects
// An array called allEnemies
var allEnemies = [new Enemy(0), new Enemy(1), new Enemy(2)];
// A player object in a variable called player
var player = new Player();
    detectCollision();

// Listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  e.preventDefault();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
