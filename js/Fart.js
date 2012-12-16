

    var Fart = function(x, y, direction)
    {
        Entity.call(this, x, y, direction);
    };
    Fart.prototype = new CollidableEntity();
    Fart.prototype.constructor = Fart;
	
	Fart.prototype.stationary = false;
	Fart.prototype.vX = 0;
	Fart.prototype.vY = 0;
	Fart.prototype.spawnRate = 200;
	Fart.prototype.lastSpawned = 0;
	Fart.prototype.decay = 4000;
    
	Fart.prototype.makeShape = function() {
		var g = this.shape.graphics;

		g.clear();
		
		g.beginFill("#0F0").drawCircle(0, 0, 16, 16);
		g.endFill();
	};
    
    Fart.prototype.getTileX = function() {
        return Math.floor(this.x / TileWidth);
    };
    
    Fart.prototype.getTileY = function() {
        return Math.floor(this.y / TileHeight);
    };
	
	
	Fart.prototype.tick = function() {
		
		var interval = createjs.Ticker.getInterval();
		var prevX = this.x;
		var prevY = this.y;
        var prevTileX = this.getTileX();
        var prevTileY = this.getTileY();
		
		var hasMoved = false;
		
		if (!this.stationary) {
			if (this.vX != 0) {
				this.x = this.x + ((interval / 1000) * this.vX);
				hasMoved = true;
			}
			if (this.vY != 0) {
				this.y = this.y + ((interval / 1000) * this.vY);
				hasMoved = true;
			}
		}
		
		if (hasMoved) {
            
            
            if (this.checkCollision(this.getTileX(), this.getTileY())) {
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
                this.x = prevX;
                this.y = prevY;
                
                var entityList = getEntityList(this.getTileX(), this.getTileY());
                
                entityList.push(this);
            }
		} else {
			var newAlpha = this.alpha - (interval / this.decay);
			
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
            if (entityList[i].collides && !(entityList[i] instanceof Fart)) {
                this.vX = 0;
                this.vY = 0;
                result = false;
            }
        }
        
        return result;
    };