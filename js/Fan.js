// Fan.js

var Fan = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
    this.caresAboutDistance = true;
	
	this.animation = new createjs.BitmapAnimation(Content.getFanSpriteSheet("fanblades.png"));
	this.animation.gotoAndPlay(direction);
    
    this.addChild(this.animation);
};
Fan.prototype = new Entity();
Fan.prototype.constructor = Fan;

Fan.prototype.force = 120;

Fan.prototype.makeShape = function() {
    
};

Fan.prototype.affect = function(entity) {
    switch(this.direction) {
        case Direction.Left:
            entity.vX = -this.force;
            entity.vY = 0;
            break;
        case Direction.Right:
            entity.vX = this.force;
            entity.vY = 0;
            break;
        case Direction.Up:
            entity.vX = 0;
            entity.vY = -this.force;
            break;
        case Direction.Down:
            entity.vX = 0;
            entity.vY = this.force;
            break;
    }
};