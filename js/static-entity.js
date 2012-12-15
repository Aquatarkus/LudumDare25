
(function(game, createjs) {

	function StaticEntity() {
		this.initialize();
	}

	var e = StaticEntity.prototype = new createjs.Container();

	e.Container_initialize = e.initialize;

	e.initialize = function() {
		this.Container_initialize();
		
		this.shape = new createjs.Shape();
		this.makeShape();
		
		this.addChild(this.shape);
	};

	e.makeShape = function() {
		var g = this.shape.graphics;

		g.clear();
		
		g.beginStroke("#F00").beginFill("#00F").drawRect(0, 0, 32, 32);
	};

	game.StaticEntity = StaticEntity;
}(game, createjs));