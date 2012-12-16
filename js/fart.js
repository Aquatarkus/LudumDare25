

    var Fart = function(x, y, direction)
    {
        Entity.call(this, x, y, direction);
    };
    Fart.prototype = new Entity();
    Fart.prototype.constructor = Fart;
	
	Fart.prototype.stationary = false;
	Fart.prototype.vX = 0;
	Fart.prototype.vY = 0;
	Fart.prototype.spawnRate = 200;
	Fart.prototype.lastSpawned = 0;
	Fart.prototype.decay = 4000;
    
    Fart.prototype.initShape = function() {
        this.shape = new createjs.Shape();
        this.makeShape();
        this.alpha = 1.0;
        
        this.addChild(this.shape);
    };
	
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
			var newAlpha = this.alpha - (interval / this.decay);
			
			if (newAlpha <= 0) {
				this.alpha = 0;
				removeEntity(this);
			} else {
				this.alpha = newAlpha;
			}
		}
	};
