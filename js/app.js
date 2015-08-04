// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/* ====================== Player class below ============================ */

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // This char could be one of many. Might be interesting to randomize the character on game reset/init
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {}
Player.prototype.render = function(x, y) {
    // Start the player in the middle column, bottom row
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && this.x > 0) {
        // player.render(-100, 0);
        this.x -= 100;
    }
    if (keyCode === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (keyCode === 'up' && this.y > 0) {
        this.y -= 85;
    }
    if (keyCode === 'down' && this.y < 400) {
        this.y += 85;
    }
    console.log(this.x, this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player,
    allEnemies;

player = new Player(200, 400);
allEnemies = [];

for (var i = 0; i < 6; i++) {
    var newEnemy = new Enemy();
    allEnemies.push(newEnemy);
}

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
