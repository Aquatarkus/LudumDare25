// Entity.js

var entityId = 0;

var Entity = function(x, y, direction)
{
    this.initialize(x, y, direction);
    entityId++;
    this.entityId = entityId;
}
Entity.prototype = new createjs.Container();
Entity.prototype.Container_initialize = Entity.prototype.initialize;
Entity.prototype.constructor = Entity;
Entity.prototype.initialize = function(x, y, direction)
{
    this.Container_initialize();

    this.setTileX(x);
    this.setTileY(y);
    this.direction = direction;
    this.caresAboutDistance = false;
	this.isSafeZone = false;
	this.isTarget = false;

    this.shape = new createjs.Shape();
    this.addChild(this.shape);

    this.setColor("#F00", "#00F");
};

Entity.prototype.setColor = function(stroke, fill)
{
    this.strokeColor = stroke;
    this.fillColor = fill;
    this.makeShape();
};

Entity.prototype.makeShape = function()
{
    var g = this.shape.graphics;

    g.clear();

    g.beginStroke(this.strokeColor).beginFill(this.fillColor).drawRect(0, 0, TileWidth-1, TileHeight-1);
};

Entity.prototype.clearTile = function()
{
    this.shape.graphics.clear();
}

Entity.prototype.getTileX = function()
{
    return Math.round(this.x / TileWidth);
};

Entity.prototype.getTileY = function()
{
    return Math.round(this.y / TileHeight);
};

Entity.prototype.setTileX = function(tileX) {
    this.x = tileX * TileWidth;
    };

Entity.prototype.setTileY = function(tileY) {
    this.y = tileY * TileHeight;
};

var Floor = function(x, y){
	Entity.call(this, x, y, null);
    this.name = "Floor";
    this.clearTile();
    var floorBitmap = new createjs.Bitmap("images/tiles/floor-light.png");
    this.addChild(floorBitmap);
};
Floor.prototype = new Entity();
Floor.prototype.constructor = Floor;


var Obstacle = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
};
Obstacle.prototype = new Entity();
Obstacle.prototype.constructor = Obstacle;
Obstacle.prototype.collides = function(direction)
{
    return true;
};

var Wall = function(x, y)
{
    Obstacle.call(this, x, y);
    this.name = "Wall";
    this.clearTile();
    var wallBitmap = new createjs.Bitmap("images/tiles/wall-tile.png");
    this.addChild(wallBitmap);
};
Wall.prototype = new Obstacle();
Wall.prototype.constructor = Wall;

var BaptismFont = function(x, y, direction)
{
	Obstacle.call(this, x, y, direction);
	this.name = "Baptism Font";
	this.clearTile();
	var bitmap = new createjs.Bitmap("images/tiles/baptism-font.png");
	this.addChild(bitmap);
};

var InvisibleWall = function(x, y)
{
    Obstacle.call(this, x, y);
    this.name = "InvisibleWall";
    this.clearTile();
};
InvisibleWall.prototype = new Obstacle();
InvisibleWall.prototype.constructor = InvisibleWall;

BaptismFont.prototype = new Obstacle();
BaptismFont.prototype.constructor = BaptismFont;

var Baby = function(x, y, direction)
{
    Entity.call(this, x, y);
    this.name = "Baby";
	this.isTarget = true;
    this.clearTile();
    var spriteSheet = Content.getSpriteSheet("/Baby.png");
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("idleWest");
    this.addChild(animation);
};
Baby.prototype = new Obstacle();
Baby.prototype.constructor = Baby;

var Pew = function(x, y, direction)
{
    Obstacle.call(this, x, y, direction);
    this.name="Pew";
    this.clearTile();
    var bitmap = new createjs.Bitmap("images/tiles/pew-interior.png");
    this.addChild(bitmap);
};
Pew.prototype = new Obstacle();
Pew.prototype.constructor = Pew;

var PewEnd = function(x, y, direction)
{
    Obstacle.call(this, x, y, direction);
    this.name = "PewEnd";
    this.clearTile();
    var imageURL = "images/tiles/pew-end.png";
    var bitmap = new createjs.Bitmap(imageURL);
    if (direction == Direction.Right)
    {
		bitmap.regX = 32;
		bitmap.scaleX = -1;
    }
    this.addChild(bitmap);
};
PewEnd.prototype = new Obstacle();
PewEnd.prototype.constructor = PewEnd;

var Door = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
    this.name = "Door";
	this.clearTile();
	var imgURL;
	if (direction == Direction.Right){
		imgURL = "images/tiles/Door-Right.png";
	}
	else{
		imgURL = "images/tiles/Door-Left.png";
	}
    var bitmap = new createjs.Bitmap(imgURL);
	this.addChild(bitmap);
	this.isSafeZone = true;
};
Door.prototype = new Entity();
Door.prototype.constructor = Door;

var Candle = function(x, y)
{
    Obstacle.call(this, x, y);
	this.clearTile();
    this.name = "Candle";
	var candleBitmap = new createjs.Bitmap('images/tiles/candelabra.png');
	this.addChild(candleBitmap);
};
Candle.prototype = new Entity();
Candle.prototype.constructor = Candle;

var Priest = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Priest";
    this.clearTile();
    var spriteSheet = Content.getSpriteSheet("/Priest.png");
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("idle");
    this.addChild(animation);
};
Priest.prototype = new Entity();
Priest.prototype.constructor = Priest;

var Cardinal = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Cardinal";
    this.isTarget = true;
    this.clearTile();
    var spriteSheet = Content.getSpriteSheet("/Cardinal.png");
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("idle");
    this.addChild(animation);
};
Cardinal.prototype = new Entity();
Cardinal.prototype.constructor = Cardinal;

var Jesus = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Jesus";
    this.isTarget = true;
    this.clearTile();
    var bitmap = new createjs.Bitmap("images/tiles/priest_still.png");
    this.addChild(bitmap);
};
Jesus.prototype = new Entity();
Jesus.prototype.constructor = Jesus;

var Singer = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Singer";
	this.clearTile();
    var spriteSheet = Content.getSpriteSheet("/SH_wDress.png");
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("walkNorth");
    this.addChild(animation);
}
Singer.prototype = new Entity();
Singer.prototype.constructor = Singer;

var Altar = function(x, y)
{
    Obstacle.call(this, x, y);
    this.name = "Altar";
	this.clearTile();
    var altarBitmap = new createjs.Bitmap("images/tiles/altar.png");
    this.addChild(altarBitmap);
}
Altar.prototype = new Obstacle();
Altar.prototype.constructor = Altar;

var Bride = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Bride";
    this.isTarget = true;
    this.clearTile();
    var spriteSheet = Content.getSpriteSheet("/Bride.png");
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("idle");
    this.addChild(animation);
};
Bride.prototype = new Entity();
Bride.prototype.constructor = Bride;

var Groom = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Groom";
    this.isTarget = true;
    this.clearTile();
    var spriteSheet = Content.getSpriteSheet("/Groom.png");
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("idle");
    this.addChild(animation);
};
Groom.prototype = new Entity();
Groom.prototype.constructor = Groom;

var Casket = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Groom";
    this.isTarget = true;
    this.clearTile();
    var bitmap = new createjs.Bitmap("images/tiles/casket.png");
    this.addChild(bitmap);
};
Casket.prototype = new Entity();
Casket.prototype.constructor = Casket;
