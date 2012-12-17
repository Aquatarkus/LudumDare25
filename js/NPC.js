var NPC = function(x, y, spriteSheet, patrolRoute) {
    CollidableEntity.call(this, x, y, Direction.Up, true);

    this.state = NPC.states.idle;
    this.stateStartTime = new Date();
    this.facing = Direction.Down;

    this.animation = new createjs.BitmapAnimation(spriteSheet);
    this.animation.gotoAndPlay("idle");

    this.patrolRoute = patrolRoute;
    if (patrolRoute && (patrolRoute.startX != patrolRoute.endX && patrolRoute.startY != patrolRoute.endY)) {
        console.error("patrols can only be directly horizontal or vertical");
        this.patrolRoute = null;
    }

    this.addChild(this.animation);
}
NPC.prototype = new CollidableEntity();
NPC.prototype.constructor = NPC;
NPC.prototype.makeShape = function() { };

NPC.states = {
    idle: "idle",
    moving: "moving"
}

NPC.prototype.patrolRoute = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    // pause at each endpoint
    pauseTime: 1000.0,
    moveTime: 300.0
};
NPC.prototype.state = null;
NPC.prototype.stateStartTime = null;
NPC.prototype.facing = null;
NPC.prototype.idleAnimName = null;
NPC.prototype.walkAnimName = null;
NPC.prototype.targetPosition = null;
NPC.prototype.lastStepPosition = null;
NPC.prototype.nextStepPosition = null;
NPC.prototype.movedLastFrame = false;

NPC.prototype.tick = function() {
    // non-moving NPCs need no updates
    if (!this.patrolRoute)
        return;

    // if idle timer is over, start animation and set movement targets
    if (this.state === NPC.states.idle && (new Date() - this.stateStartTime) > this.patrolRoute.pauseTime) {
        this.lastStepPosition = { x: this.x, y: this.y };

        // determine move direction for animation
        if (this.patrolRoute.startX == this.patrolRoute.endX) {
            // vertical movement
            this.targetPosition = {
                x: this.x, 
                y: (this.y === this.patrolRoute.startY
                    ? this.patrolRoute.endY
                    : this.patrolRoute.startY ) };
            this.nextStepPosition = {
                x: this.x,
                y: this.y + (this.y < this.targetPosition.y ? 1 : -1) * TileHeight
            };
            this.walkAnimName = this.y < this.targetPosition.y
                ? "walkSouth"
                : "walkNorth";
            this.idleAnimName = this.y < this.targetPosition.y
                ? "idleSouth"
                : "idleNorth";
            this.facing = this.y < this.targetPosition.y
                ? Direction.Down
                : Direction.Up;
        } else {
            // horizontal movement
            this.targetPosition = {
                x: (this.x === this.patrolRoute.startX
                    ? this.patrolRoute.endX
                    : this.patrolRoute.startX ),
                y: this.y };
            this.nextStepPosition = {
                x: this.x + (this.x < this.targetPosition.x ? 1 : -1) * TileWidth,
                y: this.y
            };
            this.walkAnimName = this.x < this.targetPosition.x
                ? "walkEast"
                : "walkWest";
            this.idleAnimName = this.x < this.targetPosition.x
                ? "idleEast"
                : "idleWest";
            this.facing = this.x < this.targetPosition.x
                ? Direction.Right
                : Direction.Left;
        }

        this.state = NPC.states.moving;
        this.stateStartTime = new Date();
        this.animation.gotoAndPlay(this.walkAnimName);
    }

    if (this.state === NPC.states.moving) {
        // if patrol is blocked, switch to idle and stand still, play walk anim when obstruction is cleared
        if (!this.checkCollision(this.nextStepPosition.x / TileWidth, this.nextStepPosition.y / TileHeight)) {
            this.movedLastFrame = false;
            this.stateStartTime = new Date();
            this.animation.gotoAndPlay(this.idleAnimName);
            return;
        } else {
            if (!this.movedLastFrame)
                this.animation.gotoAndPlay(this.walkAnimName);
            this.movedLastFrame = true;
        }

        // make the move to the next tile
        var moveScale = (new Date() - this.stateStartTime) / this.patrolRoute.moveTime;
        if (moveScale < 1.0) {
            // target not yet reached; move normally
            this.x = lerp(this.lastStepPosition.x, this.nextStepPosition.x, moveScale);
            this.y = lerp(this.lastStepPosition.y, this.nextStepPosition.y, moveScale);
        } else {
            // target reached, set next target
            this.x = this.nextStepPosition.x;
            this.y = this.nextStepPosition.y;

            this.stateStartTime = new Date();

            if (this.x === this.targetPosition.x &&
                this.y === this.targetPosition.y) {
                // target reached; switch to idle
                this.animation.gotoAndPlay(this.idleAnimName);
                this.state = NPC.states.idle;
            } else {
                switch (this.facing) {
                    case Direction.Up:
                        this.nextStepPosition.y -= TileHeight;
                        break;
                    case Direction.Left:
                        this.nextStepPosition.x -= TileWidth;
                        break;
                    case Direction.Down:
                        this.nextStepPosition.y += TileHeight;
                        break;
                    case Direction.Right:
                        this.nextStepPosition.x += TileWidth;
                        break;
                }
            }

            this.lastStepPosition = { x: this.x, y: this.y };
        }
    }
};

NPC.prototype.handleCollisions = function(entityList) {
    for (var i = 0; i < entityList.length; i++) {
        if (entityList[i].collides && entityList[i].id !== this.id) {
            return false;
        }
    }

    return true;
};
