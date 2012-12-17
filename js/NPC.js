var NPC = function(x, y, spriteSheet, patrolRoute) {
    CollidableEntity.call(this, x, y, Direction.Up, true);

    this.state = NPC.states.idle;
    this.stateStartTime = new Date();
    this.facing = Direction.Down;

    this.nextStepPosition = { x: this.x, y: this.y };
    this.lastStepPosition = { x: this.x, y: this.y };

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
    // pause at each patrol endpoint
    pauseTime: 1000.0,
    // milliseconds per cell traversal
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
NPC.prototype.wasMoving = false;

NPC.prototype.getTileX = function() {
    return this.nextStepPosition.x / TileWidth;
}
NPC.prototype.getTileY = function() {
    return this.nextStepPosition.y / TileHeight;
}

NPC.prototype.tick = function() {
    // non-moving NPCs need no updates
    if (!this.patrolRoute)
        return;

    // if idle timer is over, start animation and set movement targets
    if (this.state === NPC.states.idle && (new Date() - this.stateStartTime) > this.patrolRoute.pauseTime) {

        // determine move direction for animation
        if (this.patrolRoute.startX === this.patrolRoute.endX) {
            // vertical movement
            this.targetPosition = {
                x: this.x, 
                y: (this.y === this.patrolRoute.startY
                    ? this.patrolRoute.endY
                    : this.patrolRoute.startY ) };
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

        this.wasMoving = false;
        this.state = NPC.states.moving;
        this.stateStartTime = new Date();
    }

    if (this.state === NPC.states.moving) {
        if (this.wasMoving) {
            var moveScale = (new Date() - this.stateStartTime) / this.patrolRoute.moveTime;
            if (moveScale < 1.0) {
                // in motion between tiles
                this.x = lerp(this.lastStepPosition.x, this.nextStepPosition.x, moveScale);
                this.y = lerp(this.lastStepPosition.y, this.nextStepPosition.y, moveScale);
                return;
            } else {
                // cell destination reaached, correct for possible timing errors
                this.x = this.nextStepPosition.x;
                this.y = this.nextStepPosition.y;

                // if at a patrol endpoint, we're done here
                if (this.x === this.targetPosition.x && this.y === this.targetPosition.y) {
                    this.animation.gotoAndPlay(this.idleAnimName);
                    this.state = NPC.states.idle;
                    this.stateStartTime = new Date();
                    return;
                }
            }
        }

        // ready to move to next cell if it's open
        var desiredNextStep = { x: this.x, y: this.y };
        switch (this.facing) {
            case Direction.Up:
                desiredNextStep.y -= TileHeight;
                break;
            case Direction.Left:
                desiredNextStep.x -= TileWidth;
                break;
            case Direction.Down:
                desiredNextStep.y += TileHeight;
                break;
            case Direction.Right:
                desiredNextStep.x += TileWidth;
                break;
        }

        if (this.checkCollision(desiredNextStep.x / TileWidth, desiredNextStep.y / TileHeight)) {
            // no obstruction; start walking
            this.stateStartTime = new Date();
            this.lastStepPosition.x = this.x;
            this.lastStepPosition.y = this.y;
            this.nextStepPosition.x = desiredNextStep.x;
            this.nextStepPosition.y = desiredNextStep.y;

            // if we weren't already moving, play walk cycle
            if (!this.wasMoving)
                this.animation.gotoAndPlay(this.walkAnimName);

            this.wasMoving = true;
        } else {
            // collision problem; stay in place until obstruction is clear
            this.wasMoving = false;
            this.animation.gotoAndPlay(this.idleAnimName);
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
