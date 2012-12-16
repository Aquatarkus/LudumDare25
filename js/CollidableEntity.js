
var CollidableEntity = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
};
CollidableEntity.prototype = new Entity();
CollidableEntity.prototype.constructor = CollidableEntity;
CollidableEntity.prototype.collides = function(direction)
{
    return true;
};

CollidableEntity.prototype.checkCollision = function(newTileX, newTileY) {
    // First, remove the entity from the list.  We're either going to put it back here,
    // put it in the new spot, or leave it removed.
    removeEntityFromMap(this);
    
    var entityList = getEntityList(newTileX, newTileY);
    var result = true;
    
    if (entityList) {
    
        // handleCollisions is responsible for returning TRUE if it should be added to the new location.
        // If it should not, it should add it to the location that it ought to go to or do whatever it
        // ought to do to it - we can't really assume what it's going to want to do in response.
        var isCollisionSafe = this.handleCollisions(entityList);
        
        if (isCollisionSafe) {
            entityList.push(this);
        }
        
        result = isCollisionSafe;
    }
    
    return result;
};