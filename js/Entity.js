// Entity.js

var Entity = function(x, y, direction)
{
    this.initialize(x, y, direction);
}
Entity.prototype = new createjs.Container();
Entity.prototype.Container_initialize = Entity.prototype.initialize;
Entity.prototype.constructor = Entity;
Entity.prototype.initialize = function(x, y, direction)
{
    this.Container_initialize();

    this.x = x;
    this.y = y;
    this.direction = direction;

    this.shape = new createjs.Shape();
    this.addChild(this.shape);

    this.strokeColor = "#F00";
    this.fillColor = "#00F";

    this.makeShape();
}

Entity.prototype.makeShape = function()
{
    var g = this.shape.graphics;

    g.clear();

    g.beginStroke(this.strokeColor).beginFill(this.fillColor).drawRect(0, 0, TileWidth, TileHeight);
};

Entity.prototype.getTileX = function()
{
    return this.x / TileWidth;
};

Entity.prototype.getTileY = function()
{
    return this.y / TileHeight;
};

Entity.prototype.setTileX = function(tileX) {
    this.x = tileX * TileWidth;
    };

Entity.prototype.setTileY = function(tileY) {
    this.y = tileY * TileHeight;
    };


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
};
Wall.prototype = new Obstacle();
Wall.prototype.constructor = Wall;

var Pew = function(x, y, direction)
{
    Obstacle.call(this, x, y, direction);
    this.name="Pew";
};
Pew.prototype = new Obstacle();
Pew.prototype.constructor = Pew;

var PewEnd = function(x, y, direction)
{
    Obstacle.call(this, x, y, direction);
    this.name = "PewEnd";
};
PewEnd.prototype = new Obstacle();
PewEnd.prototype.constructor = PewEnd;
