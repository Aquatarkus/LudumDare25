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
    
    this.initShape();
}

Entity.prototype.initShape = function()
{
    this.shape = new createjs.Shape();
    this.addChild(this.shape);

    this.strokeColor = "#F00";
    this.fillColor = "#00F";

    this.makeShape();
};

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