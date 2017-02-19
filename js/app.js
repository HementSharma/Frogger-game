// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=getRandomArbitrary(-400,1);
    this.y=y;
};
Enemy.prototype.resetState = function () {
    // Get Random starting pint for an enemy
    this.x=getRandomArbitrary(-400,1);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>505){
      //Reset state once player goes off Screen
        this.resetState();
    }
    //Enemy speed based on level
    this.x +=20*dt*getRandomArbitrary(player.getlevel() -10, player.getlevel());
};

//Return X and y Coordinates for Enemy
Enemy.prototype.gelLocation = function () {
    return [this.x,this.y];
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y*70);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//PlayedSuper class is for player Selection screen
var PlayersSuper  = function (images) {
  this.x = 1;
  this.y = 0;
  this.sprite=images;
  this.selectedPlayer=false;
};

//Render Selection screen
PlayersSuper.prototype.render = function () {
    if(this.sprite instanceof Array) {
        //render intial screen
        var pos=0;
        //Draw Each player on Selection screen
        this.sprite.forEach(function (image) {
            ctx.drawImage(Resources.get(image), 10 ,pos);
            pos +=101;
        });
        //Draw Selection heart
            ctx.drawImage(Resources.get('images/Heart.png'), 101 ,this.y*101);
    }

};

PlayersSuper.prototype.handleInput = function (code) {
    //devided whole y section in 5 blocks ranging 0 to 4
    // Updating Selector position based on y location
    if(code == 'up'  && this.y >0){
        this.y--;
    }
    else if(code == 'down'&& this.y<4){
        this.y++;
    }
    else if(code == 'enter'){
        //Selecting played logic
        this.selectedPlayer = this.sprite[this.y];
        player.updateCharacter(this.sprite[this.y]);
    }
};

//Player class if for Player
var Player = function (playerCharacter) {
    PlayersSuper.call(this,playerCharacter);
    //Initializing current location
    this.x=2;
    this.y=4;
    //life will be used for player lifelines
    this.life=3;
};

Player.prototype = Object.create(PlayersSuper.prototype);

Player.prototype.constructor = Player;

Player.prototype.updateCharacter = function (character) {
    this.sprite=character;
    this.level = 10;
};

Player.prototype.gelLocation = function () {
    return [this.x,this.y];
};

Player.prototype.resetState = function () {
    this.x=2;
    this.y=4;
};


Player.prototype.gotLife = function(){
    this.life =3;
};

Player.prototype.lostLife= function(){
    this.life--;
};

Player.prototype.getLifeCount = function(){
    return this.life;
};

Player.prototype.render = function () {
    ctx.font="30px Verdana";
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,500,50);
    ctx.fillStyle = 'black';
    ctx.fillText("Level :-" + (this.level-9),0,40);
    ctx.drawImage(Resources.get('images/Star.png'), 404,-32,100,100);
    ctx.fillText(this.getLifeCount(),445,40);
    ctx.drawImage(Resources.get(this.sprite), this.x*101 , this.y*80);
}

Player.prototype.handleInput = function (code) {
    //reseting player to its original state and updatin game lavel once player reaches the water
    if(code == 'up' && this.y >0){
        if(this.y==1){
          this.y=4;
          this.x=2;
          this.level++;
        }
        else{
            this.y--;
        }
    }
    else if(code == 'down' && this.y<5){
        this.y++;
    }
    else if(code == "left" && this.x>0){
        this.x--;
    }
    else if(code == "right" && this.x<4){
        this.x++;
    }
}

Player.prototype.update =function (dt) {

};

Player.prototype.getlevel = function () {
  return this.level;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    if(playersSelection.selectedPlayer == false){
        playersSelection.handleInput(allowedKeys[e.keyCode]);
    }
    else{
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

var enemie =new Enemy(),
    allEnemies = [new Enemy(0,1),new Enemy(0,2),new Enemy(0,3),new Enemy(0,2)],
    player = new Player('images/char-boy.png');

var playerOptions = ['images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
var playersSelection = new PlayersSuper(playerOptions);

enemie.render();

player.render();

