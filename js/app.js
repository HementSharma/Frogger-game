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
    this.x=getRandomArbitrary(-400,1);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>505){
        this.resetState();
    }
    this.x +=20*dt*getRandomArbitrary(player.getlevel() -10, player.getlevel());

};
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
var PlayersSuper  = function (images) {
  this.x = 1;
  this.y = 0;
  this.sprite=images;
  this.selectedPlayer=false;
};


PlayersSuper.prototype.render = function () {
    if(this.sprite instanceof Array) {
        var pos=0;
        this.sprite.forEach(function (image) {
            ctx.drawImage(Resources.get(image), 10 ,pos);
            pos +=101;
        });
        ctx.drawImage(Resources.get('images/Heart.png'), 101 ,this.y*101);

    }
    else{
        ctx.font="30px Verdana";
        ctx.fillStyle = 'white';
        //ctx.fillText("choose your player",0, 40);
        ctx.fillRect(0,0,500,50);
        ctx.fillStyle = 'black';
        ctx.fillText("Level :-" + this.level,0,40);
        ctx.drawImage(Resources.get(this.sprite), this.x*101 , this.y*80);
    }
};

PlayersSuper.prototype.handleInput = function (code) {
    if(code == 'up'  && this.y >0){
        this.y--;
    }
    else if(code == 'down'&& this.y<5){
        this.y++;
    }
    else if(code == 'enter'){
        this.selectedPlayer = this.sprite[this.y];
        player.updateCharacter(this.sprite[this.y]);
    }
};
var Player = function (playerCharacter) {
    PlayersSuper.call(this,playerCharacter);
    this.x=2;
    this.y=4;
};
Player.prototype = Object.create(PlayersSuper.prototype);
Player.prototype.constructor = Player;
Player.prototype.updateCharacter = function (character) {
    this.sprite=character;
    this.level = 10;
}
Player.prototype.gelLocation = function () {
    return [this.x,this.y];
}
Player.prototype.resetState = function () {
    this.x=2;
    this.y=4;
}
Player.prototype.handleInput = function (code) {
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

