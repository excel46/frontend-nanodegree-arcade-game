// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x=0;
	this.y=Math.floor((Math.random() * 3) + 1) * 83 - 83/2;
	this.speed = Math.floor((Math.random() * 5) + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	this.x=this.x + 100*dt*this.speed;
	if(this.x>=ctx.canvas.width){
		//this.x=0;
		allEnemies.splice(allEnemies.indexOf(this),1, new Enemy());
	}
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player= function (){

	this.x=0; 
	this.y=0; 
	this.shiftx=0;
	this.shifty=0;
	this.sprite='images/char-boy.png';
	
	this.resetposition();

};

Player.prototype.update= function (){
	this.x+=this.shiftx*101;
	this.y+=this.shifty*83;
	if(this.y<0){
		this.resetposition();
	};
	this.shifty=0;
	this.shiftx=0;
};
Player.prototype.render= function (){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
};
Player.prototype.handleInput= function (key){
	switch(key) {
		case 'up':
			this.shifty-=1;
			break;
		case 'down':
			this.shifty+=1;
			break;
		case 'left':
			this.shiftx-=1;
			break;
		case 'right':
			this.shiftx+=1;
			break;
		default:
			break;
	}

};

Player.prototype.resetposition=function (){
	this.x=ctx.canvas.width/2-101/2; //ctx.width/2
	this.y=83*5-83/2; //ctx.height
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

 var allEnemies=[],player={};
 

setTimeout(function (){

player=new Player();
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
},0);


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
