// Enemies our player must avoid
var Enemy = function(loc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = ((loc * 85) + 60);
    this.speed = speed * 100;
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

    this.x += this.speed * dt;

    // Once the x position of an Enemy object has exceeded the canvas width
    // Enemy object moves back to initial starting position
    if (this.x > 500) {
        this.x = this.x - 671;
    }

    if (detectCollision()) {
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
    this.speed = 50;
    this.sprite = 'images/char-boy.png';
    this.height = 76;
    this.width = 67;
};

// Methods shared for all Player objects
Player.prototype.moveLEFT = function() {
    this.x -= 100;
    if (this.x < 0) {
        this.x = 0;
    }
};

Player.prototype.moveUP = function() {
    this.y -= 85;
    if (this.y < 0) {
        this.y = 400;
        alert("You won!");
    }
};

Player.prototype.moveDOWN = function() {
    this.y += 85;
    if (this.y > 400) {
        this.y = 400;
    }
};

Player.prototype.moveRIGHT = function() {
    this.x += 100;
    if (this.x > 400) {
        this.x = 400;
    }
};

// Handles user input using the arrow keys UP, DOWN, LEFT, RIGHT
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'up':
            this.moveUP();
            break;
        case 'down':
            this.moveDOWN();
            break;
        case 'left':
            this.moveLEFT();
            break;
        case 'right':
            this.moveRIGHT();
            break;
        default:
    }
};

Player.prototype.update = function(dt) {
};

// Draw Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// If an Enemy comes into contact with the Player
// Player returns back to initial starting position
var detectCollision = function() {
    var collision = false;
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y) {
            collision = true;
        }
    }
    if (collision === true) {
        return true;
    } else {
        return false;
    }
};

// Instantiate objects
// An array called allEnemies
var allEnemies = [new Enemy(0, 5), new Enemy(1, 3), new Enemy(2, 1),
    new Enemy(0, 8), new Enemy(1, 11), new Enemy(2, 7)
];
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
