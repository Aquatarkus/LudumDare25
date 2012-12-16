
    var Fan = function(x, y, direction)
    {
        Entity.call(this, x, y, direction);
    };
    Fan.prototype = new Entity();
    Fan.prototype.constructor = Fan;
    
    
	Fan.prototype.makeShape = function() {
		var g = this.shape.graphics;

		g.clear();
        g.beginFill("#FFF");
        
        switch(this.direction) {
            case Direction.Left:
                g.drawRectangle(16, 0, 32, 32);
                break;
            case Direction.Right:
                g.drawRectangle(0, 0, 16, 32);
                break;
            case Direction.Up:
                g.drawRectangle(0, 0, 16, 16);
                break;
            case Direction.Down:
                g.drawRectangle(0, 16, 32, 32);
                break;
        }
		
		g.endFill();
	};
   