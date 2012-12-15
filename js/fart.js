
(function(game, createjs) {

	function Fart() {
		this.initialize();
	}

	Fart.prototype = new createjs.Container();
	
	Fart.prototype.Container_initialize = Fart.prototype.initialize;

	Fart.prototype.initialize = function() {
		this.Container_initialize();
		
		this.shape = new createjs.Shape();
		this.makeShape();
		this.alpha = 1.0;
		
		this.addChild(this.shape);
	};
	
	Fart.prototype.stationary = false;
	Fart.prototype.vX = 0;
	Fart.prototype.vY = 0;
	Fart.prototype.spawnRate = 200;
	Fart.prototype.lastSpawned = 0;
	Fart.prototype.fartlings = [];
	Fart.prototype.decay = 4000;
	
	Fart.prototype.getTileX = function() {
		return Math.round(this.x / 24);
	};
	
	Fart.prototype.getTileY = function() {
		return Math.round(this.y / 24);
	};
	
	Fart.prototype.setTileX = function(tileX) {
		this.x = tileX * 24;
	};
	
	Fart.prototype.setTileY = function(tileY) {
		this.y = tileY * 24;
	};
	
	Fart.prototype.makeShape = function() {
		var g = this.shape.graphics;

		g.clear();
		
		g.beginFill("#0F0").drawCircle(0, 0, 16, 16);
		g.endFill();
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
				
				var newFartling = new game.Fart();
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

	game.Fart = Fart;
}(game, createjs));