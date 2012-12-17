
var CollidableEntity = function(x, y, direction, doCollisionChecks)
{
    Entity.call(this, x, y, direction);
    this.doCollisionChecks = doCollisionChecks;
};
CollidableEntity.prototype = new Entity();
CollidableEntity.prototype.constructor = CollidableEntity;
CollidableEntity.prototype.collides = function(direction)
{
    return true;
};

CollidableEntity.prototype.checkCollision = function(newTileX, newTileY) {
    var entityList = getEntityList(newTileX, newTileY);
    var isCollisionSafe = true;
    
    if (entityList) {
    
        // handleCollisions is responsible for returning TRUE if it should be added to the new location.
        // If it should not, it should add it to the location that it ought to go to or do whatever it
        // ought to do to it - we can't really assume what it's going to want to do in response.
        isCollisionSafe = this.handleCollisions(entityList);
        
    }
    
    return isCollisionSafe;
};