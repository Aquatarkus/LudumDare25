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
    this.clearTile();
    var wallBitmap = new createjs.Bitmap("images/dark_wall.png");
    this.addChild(wallBitmap);
};
Wall.prototype = new Obstacle();
Wall.prototype.constructor = Wall;

var Pew = function(x, y, direction)
{
    Obstacle.call(this, x, y, direction);
    this.name="Pew";
    this.setColor("#c04000", "#A05220");
};
Pew.prototype = new Obstacle();
Pew.prototype.constructor = Pew;

var PewEnd = function(x, y, direction)
{
    Obstacle.call(this, x, y, direction);
    this.name = "PewEnd";
    this.setColor("#DAA520", "#804618");
};
PewEnd.prototype = new Obstacle();
PewEnd.prototype.constructor = PewEnd;

var Door = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
    this.name = "Door";
    this.setColor("#E2CACA", "#A67B5B");
};
Door.prototype = new Entity();
Door.prototype.constructor = Door;

var Candle = function(x, y)
{
    Obstacle.call(this, x, y);
    this.name = "Candle";
    this.setColor("yellow", "red");
};
Candle.prototype = new Entity();
Candle.prototype.constructor = Candle;

var Priest = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Priest";
    this.clearTile();
    var bitmap = new createjs.Bitmap("images/tiles/priest_still.png");
    this.addChild(bitmap);
};
Priest.prototype = new Entity();
Priest.prototype.constructor = Priest;

var Singer = function(x, y)
{
    Entity.call(this, x, y);
    this.name = "Singer";
    this.setColor("blue", "white");
}
Singer.prototype = new Entity();
Singer.prototype.constructor = Singer;

var Table = function(x, y)
{
    Obstacle.call(this, x, y);
    this.name = "Singer";
    this.setColor("yellow", "brown");
    var tableBitmap = new createjs.Bitmap("images/light_wall.png");
    this.addChild(tableBitmap);
}
Table.prototype = new Obstacle();
Table.prototype.constructor = Table;