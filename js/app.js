// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x = this.x + (this.speed * dt);
    // If the enemy is off-screen (to the right),
    if (this.x > 500) {
        // Put it back off-screen (to the left)
        this.x = -90;
        // And give it a new, random speed
        this.randomizeSpeed();
    }
};

Enemy.prototype.randomizeSpeed = function() {
    var randomMultiplier = Math.floor(Math.random() * 5 + 1);
    this.speed = randomMultiplier * 60;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* ====================== Player class below ============================ */

var canvasTopLimit = 50;
var canvasBottomLimit = 400;
var canvasLeftLimit = 0;
var canvasRightLimit = 400;

// Where to start the player
var playerInitialX = 200;
var playerInitialY = 400;

// How much to increment by when moving on the x and y axis
var playerMovementX = 101;
var playerMovementY = 82;

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function(x, y) {
    // This char could be one of many. Might be interesting to randomize the character on game reset/init
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // Unsure of what would need to go here? It said it was needed?
    // Check if the player is occupying the same space as any of the enemies
    for (var i = 0; i < allEnemies.length; i++) {
        this.checkCollisions(this, allEnemies[i]);
    }
};

Player.prototype.render = function(x, y) {
    // Start the player in the middle column, bottom row
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // If the player has reached the water row, reset them to their initial position
    if (this.y < 15) {
        this.resetPosition();
    }
};

Player.prototype.checkCollisions = function(player, enemy) {
    var enemyPosition = {
        left: enemy.x,
        right: enemy.x + 100,
        top: enemy.y + 90,
        bottom: enemy.y + 154
    }
    var playerPosition = {
        left: player.x,
        right: player.x + 100,
        top: player.y + 64,
        bottom: player.y + 152
    }

    // Create an offset to deal with the transparent top of the sprite causing collisions
    var offset = 50;

    // Reset the player if the collision is detected
    if (enemyPosition.left < playerPosition.right &&
        enemyPosition.right > playerPosition.left &&
        enemyPosition.top < playerPosition.bottom &&
        enemyPosition.bottom > playerPosition.top + offset) {
        player.resetPosition();
    }
};

Player.prototype.resetPosition = function() {
    this.x = playerInitialX;
    this.y = playerInitialY;
};

Player.prototype.handleInput = function(keyCode) {
    // If the input is the left arrow, and the player is not off-canvas
    if (keyCode === 'left' && this.x > canvasLeftLimit) {
        // Move the player one movement to the left
        this.x -= playerMovementX;
    }
    if (keyCode === 'right' && this.x < canvasRightLimit) {
        this.x += playerMovementX;
    }
    if (keyCode === 'up' && this.y > canvasTopLimit) {
        this.y -= playerMovementY;
    }
    if (keyCode === 'down' && this.y < canvasBottomLimit) {
        this.y += playerMovementY;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player,
    allEnemies;

player = new Player(playerInitialX, playerInitialY);
allEnemies = [];

//  Create all the enemies. In this case, we're creating 3
for (var i = 0; i < 3; i++) {
    // Randomize a speed to use as an argument when creating an enemy
    var initialSpeed = Math.floor(Math.random() * 5 + 1) * 60;

    // Create an enemy, arguments are x, y, and speed
    // 'x' is negative to place the enemy off-canvas (to the left)
    // 'y' in this case is calculated by multiplying the tile height (85) by the index of the iterated element.
    // This gives evenly spaced enemies. Then we add 57 to try and optically center the enemies in their respective rows 
    var newEnemy = new Enemy(-120, 57 + (85 * i), initialSpeed);
    
    // Push the enemy into the array
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
