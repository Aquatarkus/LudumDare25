var Player = function(x, y, spriteSheet) {
    CollidableEntity.call(this, x, y, Direction.Up, true);

    this.animation = new createjs.BitmapAnimation(spriteSheet);
    this.animation.gotoAndPlay("idle");

    this.addChild(this.animation);

    // start input handling
    window.addEventListener("keydown", this.handleKeyDown, true);
    window.addEventListener("keyup", this.handleKeyUp, true);
	
	this.resetState();
};
Player.prototype = new CollidableEntity();
Player.prototype.constructor = Player;
Player.prototype.makeShape = function() { };

Player.prototype.facing = Direction.Down;
Player.prototype.isMoving = false;
Player.prototype.moveStartPosition = { x: 0, y: 0 };
Player.prototype.targetPosition = { x: 0, y: 0 };
Player.prototype.moveStartTime = null;
Player.prototype.moveTime = 300.0;
Player.prototype.fartsRemaining = 64;
Player.prototype.fartSpeed = 120.0;

Player.prototype.isDefeated = false;
Player.prototype.isVictorious = false;
Player.prototype.isImmobile = false;

Player.prototype.fartInitiated = false;

Player.prototype.keyboardState = {
    isUpHeld: false,
    isLeftHeld: false,
    isDownHeld: false,
    isRightHeld: false,
    isFartButtonHeld: false
};

Player.prototype.resetState = function() {
	this.isDefeated = false;
	this.isVictorious = false;
	this.isImmobile = false;
    this.fartInitiated = false;
};

Player.prototype.fart = function() {
    // if no stock, return
    if (this.fartsRemaining-- <= 0) {
        return;
    }

    var fart = new Fart(this.getTileX(), this.getTileY(), Direction.Up, true);
    var fartDirection = { x: 0, y: 0 };

    // fart launches opposite player facing
    switch (this.facing) {
        case Direction.Up:
            fartDirection.y = 1;
            break;

        case Direction.Left:
            fartDirection.x = 1;
            break;

        case Direction.Down:
            fartDirection.y = -1;
            break;

        case Direction.Right:
            fartDirection.x = -1;
            break;
    }

    fart.vX = fartDirection.x * this.fartSpeed;
    fart.vY = fartDirection.y * this.fartSpeed;
    fart.x = this.x;
    fart.y = this.y;

    addEntity(fart);
    fartSound.play();
};

Player.prototype.handleKeyDown = function(evt) {
    // if movement controls, prevent default
    switch (evt.keyCode) {
        case Keys.Space:
        case Keys.Shift:
        case Keys.X:
        case Keys.Up:
        case Keys.Down:
        case Keys.Left:
        case Keys.Right:
        case Keys.W:
        case Keys.A:
        case Keys.S:
        case Keys.D:
            evt.preventDefault();
    }

    // set keyboard state (used in tick())
    switch (evt.keyCode) {
        case Keys.Space:
        case Keys.Shift:
        case Keys.X:
            player.keyboardState.isFartButtonHeld = true;
            break;

        case Keys.Up:
        case Keys.W:
            player.keyboardState.isUpHeld = true;
            break;
        
        case Keys.Left:
        case Keys.A:
            player.keyboardState.isLeftHeld = true;
            break;
        
        case Keys.Down:
        case Keys.S:
            player.keyboardState.isDownHeld = true;
            break;
        
        case Keys.Right:
        case Keys.D:
            player.keyboardState.isRightHeld = true;
            break;
    }
};

Player.prototype.handleKeyUp = function(evt) {
    switch (evt.keyCode) {
        case Keys.Space:
        case Keys.Shift:
        case Keys.X:
            player.keyboardState.isFartButtonHeld = false;
            player.fartInitiated = false;
            break;

        case Keys.Up:
        case Keys.W:
            player.keyboardState.isUpHeld = false;
            break;
        
        case Keys.Left:
        case Keys.A:
            player.keyboardState.isLeftHeld = false;
            break;
        
        case Keys.Down:
        case Keys.S:
            player.keyboardState.isDownHeld = false;
            break;
        
        case Keys.Right:
        case Keys.D:
            player.keyboardState.isRightHeld = false;
            break;
    }
};

Player.prototype.tick = function() {
	if (this.isImmobile) {
		this.keyboardState.isUpHeld = false;
		this.keyboardState.isDownHeld = false;
		this.keyboardState.isLeftHeld = false;
		this.keyboardState.isRightHeld = false;
	}
    // if in motion, update position for drawing
    var wasMoving = this.isMoving;
    if (this.isMoving) {
        var moveScale = (new Date() - this.moveStartTime) / this.moveTime;

        if (moveScale >= 1.0) {
            // target reached, no longer moving
            this.x = this.targetPosition.x;
            this.y = this.targetPosition.y;
            this.isMoving = false;

            // only stop animation if key was released
            if (this.facing === Direction.Up && !this.keyboardState.isUpHeld)
                this.animation.gotoAndPlay("idleNorth");
            else if (this.facing === Direction.Left && !this.keyboardState.isLeftHeld)
                this.animation.gotoAndPlay("idleWest");
            else if (this.facing === Direction.Down && !this.keyboardState.isDownHeld)
                this.animation.gotoAndPlay("idleSouth");
            else if (this.facing === Direction.Right && !this.keyboardState.isRightHeld)
                this.animation.gotoAndPlay("idleEast");
        } else {
            // proceed toward target smoothly
            this.x = lerp(this.moveStartPosition.x, this.targetPosition.x, moveScale);
            this.y = lerp(this.moveStartPosition.y, this.targetPosition.y, moveScale);
        }
    }

    if (!this.isMoving) {
        if (this.keyboardState.isFartButtonHeld) {
            if (!this.fartInitiated) {
                this.fartInitiated = true;
                if (this.isDefeated) {
                    gameController.reloadLevel();
                } else if (this.isVictorious) {
                    gameController.loadNextLevel();
                } else {
                    this.fart();
                }
                
                return;
           }
        }

        var delta = { x: 0, y: 0 };
        var newAnimName = null;
        if (this.keyboardState.isUpHeld) {
            if (!wasMoving || this.facing !== Direction.Up)
                newAnimName = "walkNorth";
            this.facing = Direction.Up;
            delta.y = -1;
        } else if (this.keyboardState.isLeftHeld) {
            if (!wasMoving || this.facing !== Direction.Left)
                newAnimName = "walkWest";
            this.facing = Direction.Left;
            delta.x = -1;
        } else if (this.keyboardState.isDownHeld) {
            if (!wasMoving || this.facing !== Direction.Down)
                newAnimName = "walkSouth";
            this.facing = Direction.Down;
            delta.y = 1;
        } else if (this.keyboardState.isRightHeld) {
            if (!wasMoving || this.facing !== Direction.Right)
                newAnimName = "walkEast";
            this.facing = Direction.Right;
            delta.x = 1;
        }

        // if about to move, set params
        if (delta.x != delta.y) {
            if (newAnimName)
                this.animation.gotoAndPlay(newAnimName);
            this.moveStartPosition.x = this.x;
            this.moveStartPosition.y = this.y;
            this.targetPosition.x = this.x + (TileWidth * delta.x);
            this.targetPosition.y = this.y + (TileHeight * delta.y);

            // if you can't move to desired target position, don't move
            if (!this.checkCollision(this.targetPosition.x / TileWidth, this.targetPosition.y / TileHeight)) {
                switch (this.facing) {
                    case Direction.Up:
                        this.animation.gotoAndPlay("idleNorth");
                        break;

                    case Direction.Left:
                        this.animation.gotoAndPlay("idleWest");
                        break;

                    case Direction.Down:
                        this.animation.gotoAndPlay("idleSouth");
                        break;

                    case Direction.Right:
                        this.animation.gotoAndPlay("idleEast");
                        break;
                }

                return;
            }

            this.isMoving = true;
            this.moveStartTime = new Date();
        }
    }
};

Player.prototype.handleCollisions = function(entityList) {
    var result = true;

    for (var i = 0; i < entityList.length; i++) {
        if (entityList[i].collides && !(entityList[i] instanceof Fart)) {
            result = false;
            break;
        }
    }

    return result;
};

var player = new Player(0, 0, Content.getSpriteSheet("L_James.png"));
