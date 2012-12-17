var Content = new function() { };

Content.loadedSpriteSheets = [];
Content.getSpriteSheet = function(filename) {
    // load from cache if available
    for (var i in this.loadedSpriteSheets)
        if (this.loadedSpriteSheets[i].filename == filename)
            return this.loadedSpriteSheets[i].sprite;

    // load sprite, configure animations
    var sprite = new createjs.SpriteSheet({
        images: [ "images/" + filename ],
        // weird regX and regY values to accomodate setTileX/Y system
        frames: { width: 24, height: 32, count: 12, regX: -4, regY: 0 },
        animations: {
            // default idle
            idle: 7,

            // directional idle
            idleNorth: 1,
            idleWest: 10,
            idleSouth: 7,
            idleEast:  4,

            // walking
            walkNorth: { frames: [ 0,  1,  2,  1 ], frequency: 7 },
            walkWest:  { frames: [ 9, 10, 11, 10 ], frequency: 7 },
            walkSouth: { frames: [ 6,  7,  8,  7 ], frequency: 7 },
            walkEast:  { frames: [ 3,  4,  5,  4 ], frequency: 7 },
        }
    });

    // add to cache
    this.loadedSpriteSheets.push({ filename: filename, sprite: sprite });

    return sprite;
};

Content.getFartSpriteSheet = function(filename) {
	// load from cache if available
    for (var i in this.loadedSpriteSheets)
        if (this.loadedSpriteSheets[i].filename == filename)
            return this.loadedSpriteSheets[i].sprite;

    // load sprite, configure animations
    var sprite = new createjs.SpriteSheet({
        images: [ "images/" + filename ],
        // weird regX and regY values to accomodate setTileX/Y system
        frames: { width: 32, height: 32, count: 7, regX: 0, regY: 0 },
        animations: {
			idle: { frames: [0, 1, 2, 3], frequency: 20 },
            fart: { frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ], frequency: 40 }
        }
    });

    // add to cache
    this.loadedSpriteSheets.push({ filename: filename, sprite: sprite });

    return sprite;
};


Content.getFanSpriteSheet = function(filename) {
	// load from cache if available
    for (var i in this.loadedSpriteSheets)
        if (this.loadedSpriteSheets[i].filename == filename)
            return this.loadedSpriteSheets[i].sprite;

    // load sprite, configure animations
    var sprite = new createjs.SpriteSheet({
        images: [ "images/" + filename ],
        // weird regX and regY values to accomodate setTileX/Y system
        frames: { width: 32, height: 32, count: 24, regX: 0, regY: 0 },
        animations: {
			left: { frames: [ 18, 19, 20, 21, 22, 23], frequency: 5 },
			right: { frames: [ 6, 7, 8, 9, 10, 11 ], frequency: 5 },
			up: { frames: [ 0, 1, 2, 3, 4, 5 ], frequency: 5 },
			down: { frames: [ 12, 13, 14, 15, 16, 17], frequency: 5 }
        }
    });

    // add to cache
    this.loadedSpriteSheets.push({ filename: filename, sprite: sprite });

    return sprite;
};
