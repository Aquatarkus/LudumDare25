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
        frames: { width: 24, height: 32, count: 12, regX: 12, regY: 32 },
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
