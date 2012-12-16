var Player = function(x, y, spriteSheet) {
    Entity.call(this, x, y)

    this.animation = new createjs.BitmapAnimation(spriteSheet);
    this.animation.gotoAndPlay("idle");

    this.addChild(this.animation);

    // start input handling
    window.addEventListener("keydown", this.handleKeyDown, true);
    window.addEventListener("keyup", this.handleKeyUp, true);
};
Player.prototype = new Entity();
Player.prototype.constructor = Player;
Player.prototype.makeShape = function() { };

Player.prototype.facing = Direction.Down;
Player.prototype.isMoving = false;
Player.prototype.moveStartPosition = { x: 0, y: 0 };
Player.prototype.targetPosition = { x: 0, y: 0 };
Player.prototype.moveStartTime = null;
Player.prototype.moveTime = 300.0;
Player.prototype.keyboardState = {
    isUpHeld: false,
    isLeftHeld: false,
    isDownHeld: false,
    isRightHeld: false
};

Player.prototype.handleKeyDown = function(evt) {
    // if movement controls, prevent default
    switch (evt.keyCode) {
        case MovementKeys.Up:
        case MovementKeys.Down:
        case MovementKeys.Left:
        case MovementKeys.Right:
        case MovementKeys.W:
        case MovementKeys.A:
        case MovementKeys.S:
        case MovementKeys.D:
            evt.preventDefault();
    }

    // set keyboard state (used in tick())
    switch (evt.keyCode) {
        case MovementKeys.Up:
        case MovementKeys.W:
            player.keyboardState.isUpHeld = true;
            break;
        
        case MovementKeys.Left:
        case MovementKeys.A:
            player.keyboardState.isLeftHeld = true;
            break;
        
        case MovementKeys.Down:
        case MovementKeys.S:
            player.keyboardState.isDownHeld = true;
            break;
        
        case MovementKeys.Right:
        case MovementKeys.D:
            player.keyboardState.isRightHeld = true;
            break;
    }
};

Player.prototype.handleKeyUp = function(evt) {
    switch (evt.keyCode) {
        case MovementKeys.Up:
        case MovementKeys.W:
            player.keyboardState.isUpHeld = false;
            break;
        
        case MovementKeys.Left:
        case MovementKeys.A:
            player.keyboardState.isLeftHeld = false;
            break;
        
        case MovementKeys.Down:
        case MovementKeys.S:
            player.keyboardState.isDownHeld = false;
            break;
        
        case MovementKeys.Right:
        case MovementKeys.D:
            player.keyboardState.isRightHeld = false;
            break;
    }
};

Player.prototype.tick = function() {
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

            this.isMoving = true;
            this.moveStartTime = new Date();
        }
    }
};

var player = new Player(2, 2, Content.getSpriteSheet("M_Elvis.png"));
