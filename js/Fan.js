// Fan.js

var Fan = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
    this.caresAboutDistance = true;
};
Fan.prototype = new Entity();
Fan.prototype.constructor = Fan;

Fan.prototype.force = 80;

Fan.prototype.makeShape = function() {
    var g = this.shape.graphics;

    g.clear();
    g.beginFill("#FFF");

    switch(this.direction) {
        case Direction.Left:
            g.drawRect(16, 0, 16, 32);
            break;
        case Direction.Right:
            g.drawRect(0, 0, 16, 32);
            break;
        case Direction.Up:
            g.drawRect(0, 16, 32, 16);
            break;
        case Direction.Down:
            g.drawRect(0, 0, 32, 16);
            break;
    }

    g.endFill();
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