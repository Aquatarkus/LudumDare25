// Fart.js

var Fart = function(x, y, direction)
{
    Entity.call(this, x, y, direction);
	
	this.animation = new createjs.BitmapAnimation(Content.getFartSpriteSheet("fart.png"));
    this.animation.gotoAndPlay("fart");

    this.addChild(this.animation);
};

Fart.prototype = new CollidableEntity();
Fart.prototype.constructor = Fart;

Fart.prototype.stationary = false;
Fart.prototype.vX = 0;
Fart.prototype.vY = 0;
Fart.prototype.spawnRate = 200;
Fart.prototype.lastSpawned = 0;
Fart.prototype.decay = 4000;
// the first frame of its creation, count that it has changed tiles as well.
Fart.prototype.hasChangedTile = true;
Fart.prototype.isDissipating = true;

Fart.prototype.makeShape = function() {
	
};

Fart.prototype.getTileX = function() {
	if (this.vX > 0) {
		return Math.floor(this.x / TileWidth);
	} else if (this.vX < 0) {
		return Math.ceil(this.x / TileWidth);
	} else {
		return Math.round(this.x / TileWidth);
	}
};

Fart.prototype.getTileY = function() {
	if (this.vY > 0) {
		return Math.floor(this.y / TileHeight);
	} else if (this.vY < 0) {
		return Math.ceil(this.y / TileHeight);
	} else {
		return Math.round(this.y / TileHeight);
	}
};

Fart.prototype.tick = function() {

    if (!this.stationary) {
        this.checkDistanceEntities();
    }

    var interval = createjs.Ticker.getInterval();
    var prevX = this.x;
    var prevY = this.y;

    var newX = this.x;
    var newY = this.y;

    var hasMoved = false;

    if (!this.stationary) {
        if (this.vX != 0) {
            newX = this.x + ((interval / 1000) * this.vX);
            hasMoved = true;
        }
        if (this.vY != 0) {
            newY = this.y + ((interval / 1000) * this.vY);
            hasMoved = true;
        }
    }

    var newTileX = Math.round(newX / TileWidth);
    var newTileY = Math.round(newY / TileHeight);

    if (hasMoved) {

        if (this.checkCollision(newTileX, newTileY)) {

            this.hasChangedTile = (newTileX != this.getTileX() || newTileY != this.getTileY());

            this.x = newX;
            this.y = newY;
            var ticks = interval * createjs.Ticker.getTicks();

            if (ticks - this.lastSpawned > this.spawnRate) {
                this.lastSpawned = ticks;

                var newFartling = new Fart();
                newFartling.stationary = true;
                newFartling.alpha = 0.5;
                newFartling.x = prevX;
                newFartling.y = prevY;

                // Fart gotta keep moving
                addEntity(newFartling);
            }
        } else {
            var entityList = getEntityList(this.getTileX(), this.getTileY());
            if (entityList) {
                entityList.push(this);
            }
            hasMoved = false;
			
            this.vX = 0;
            this.vY = 0;
        }
    }

    if (hasMoved) {
		if (this.isDissipating) {
			this.isDissipating = false;
			this.animation.gotoAndPlay("idle");
		}
	} else {
        var newAlpha = this.alpha - (interval / this.decay);

		if (!this.isDissipating) {
			this.isDissipating = true;
			this.animation.gotoAndPlay("fart");
		}
		
        if (newAlpha <= 0) {
            this.alpha = 0;
            removeEntity(this);
        } else {
            this.alpha = newAlpha;
        }
    }
};



Fart.prototype.handleCollisions = function(entityList) {
    var result = true;

    for(var i = 0; i < entityList.length; i++) {
        if (entityList[i].collides && !(entityList[i] instanceof Fart) && !(entityList[i] instanceof Player)) {
            this.vX = 0;
            this.vY = 0;
            result = false;
        }
    }

    return result;
};

Fart.prototype.checkDistanceEntities = function() {
    if (!this.hasChangedTile) {
        return;
    }

    var entities = getDistanceEntities();

    var closestDE = null;
    var closestDist = 9999;

    var tileX = this.getTileX();
    var tileY = this.getTileY();

    for(var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var found = false;
        var dist = 9999;

        var entityTileX = entity.getTileX();
        var entityTileY = entity.getTileY();

        switch(entity.direction) {
            case Direction.Up:
                if (tileX == entityTileX && tileY <= entityTileY) {
                    found = true;
                    dist = entityTileY - tileY;
                }
                break;
            case Direction.Down:
                if (tileX == entityTileX && tileY >= entityTileY) {
                    found = true;
                    dist = tileY - entityTileY;
                }
                break;
            case Direction.Left:
                if (tileY == entityTileY && tileX <= entityTileX) {
                    found = true;
                    dist = entityTileX - tileX;
                }
                break;
            case Direction.Right:
                if (tileY == entityTileY && tileX >= entityTileX) {
                    found = true;
                    dist = tileX - entityTileX;
                }
                break;
        }

        if (found && closestDist > dist) {
            closestDist = dist;
            closestDE = entity;
        }
    }

    if (closestDE) {
        closestDE.affect(this);
    }
};


