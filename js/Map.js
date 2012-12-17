// Map.js

var Map = function(name, stage, rows)
{
    this.name = name;
    this.stage = stage;
    this.rows = rows;

    this.rowCount = this.rows.length;
    this.columnCount = this.rows[0].length;

    this.entities = [];
    this.entityPositionsById = [];
    this.distanceEntities = [];
	this.safeZones = [];
	this.targets = [];
	this.player = null;
    this.npcsByName = {};
};

Map.prototype.entityHit = function(entity) {
	
	if (entity.isTarget) {
		// As soon as the player hits any target, don't let them move until everything resolves
		this.player.isImmobile = true;
		
		for (var i = 0; i < this.targets.length; i++) {
			if (this.targets[i] === entity) {
				this.targets.splice(i, 1);
				break;
			}
		}
		
		var success = false;
	
		for (var i = 0; i < this.safeZones.length; i++) {
			var safeZone = this.safeZones[i];
			
			if ((safeZone.getTileX() == this.player.getTileX()) && (safeZone.getTileY() == this.player.getTileY())) {
				success = true;
				
				break;
			}
		}
		
		if (success) {
			if (this.targets.length == 0) {
				this.setVictory();
			}
		} else {
			this.setDefeat();
		}
	}
};

Map.prototype.setVictory = function() {
	var message = new createjs.Text("VICTORY!\n\nPress any key to continue...", "bold 24px Arial", "#22AA22");
	message.maxWidth = 800;
	message.textAlign = "center";
	message.x = 400;
	message.y = 300;
	this.stage.addChild(message);
	
	this.player.isVictorious = true;
};

Map.prototype.setDefeat = function() {
	var message = new createjs.Text("DEFEATED!\n\nYou must proceed to a safe zone, such as a doorway, before the fart reaches your target!\n\nPress any key to continue...", "bold 24px Arial", "#AA2222");
	message.maxWidth = 800;
	message.textAlign = "center";
	message.x = 400;
	message.y = 300;
	this.stage.addChild(message);
	
	this.player.isDefeated = true;
};

Map.prototype.removeEntityTilePosition = function(entity)
{
    var entityList = this.entityPositionsById[entity.entityId];
    
    if (entityList) {
        for(var i = 0; i < entityList.length; i++) {
            if (entityList[i] === entity) {
                entityList.splice(i, 1);
                break;
            }
        }
    }
    
    this.entityPositionsById[entity.entityId] = null;
};

Map.prototype.addEntity = function(entity)
{
    if (entity != null)
    {
        this.setEntityTilePosition(entity);
        this.stage.addChild(entity);
        
        if (entity.caresAboutDistance)
        {
            this.distanceEntities.push(entity);
        }
		if (entity.isSafeZone)
		{
			this.safeZones.push(entity);
		}
		if (entity.isTarget)
		{
			this.targets.push(entity);
		}
		if (entity instanceof Player)
        {
			this.player = entity;
		}
    }
};

Map.prototype.setEntityTilePosition = function(entity) {
    var x = entity.getTileX();
    var y = entity.getTileY();
    
    if (this.entityPositionsById[entity.entityId] != this.entities[x][y]) {
        this.entities[x][y].push(entity);
        this.entityPositionsById[entity.entityId] = this.entities[x][y];
    }
};

Map.prototype.getEntityList = function(tileX, tileY) {
    var result = null;
    
    if (this.entities[tileX]) {
        if (this.entities[tileX][tileY]) {
            result = this.entities[tileX][tileY];
        }
    }
    
    return result;
};

Map.prototype.parseRows = function()
{
    this.entities = [];
    
    for (var x = 0; x < this.columnCount; x++)
    {
        this.entities[x] = [];
        for (var y = 0; y < this.rowCount; y++)
        {
            this.entities[x][y] = [];
        }
    }

    for (var y in this.rows)
    {
        var row = this.rows[y];
        for (var x in row)
        {
            var character = row[x];
            var entity = this.entityForCharacter(character, x, y);
            this.addEntity(entity);
        }
    }
};

Map.prototype.entityForCharacter = function(character, x, y)
{
    var entity = null;
    switch (character)
    {
        case "#":
            // wall
            entity = new Wall(x, y);
            break;
        case "I":
            // invisible wall
            entity = new InvisibleWall(x, y);
            break;
        case " ":
            // floor
            entity = null;
            break;
        case "P":
            // pew
            entity = new Pew(x, y, Direction.Down);
            break;
        case "[":
            // left pew end
            entity = new PewEnd(x, y, Direction.Left);
            break;
        case "]":
            // right pew end
            entity = new PewEnd(x, y, Direction.Right);
            break;
        case "{":
            // left door
            entity = new Door(x, y, Direction.Left);
            break;
        case "}":
            // right door
            entity = new Door(x, y, Direction.Right);
            break;
        case "+":
            // priest
            entity = new Priest(x, y, Direction.Up);
            break;
        case "c":
            // candle
            entity = new Candle(x, y);
            break;
        case "C":
            // cardinal
            entity = new Cardinal(x, y);
            break;
        case "S":
            // candle
            entity = new Singer(x, y, Direction.Down);
            break;
        case "T":
            // Table
            entity = new Table(x, y);
            break;
        case "V":
            // villain
            entity = player;
			player.resetState();
            player.setTileX(x);
            player.setTileY(y);
            break;
        case "J":
            entity = new Jesus(x, y, Direction.Down);
            break;
        case ">":
            entity = new Fan(x, y, Direction.Right);
            break;
        case "<":
            entity = new Fan(x, y, Direction.Left);
            break;
        case "^":
            entity = new Fan(x, y, Direction.Up);
            break;
        case "v":
            entity = new Fan(x, y, Direction.Down);
            break;
		case "Q":
			entity = new BaptismFont(x, y, Direction.Down);
			break;
		case "b":
			entity = new Baby(x, y, Direction.Down);
			break;
        default:
            // try an NPC patroller
            var isNPC = this.addNPCWithCharacter(character, x, y);
            if (isNPC == false)
            {
                console.log("Unknown map character: "+character);
            }
            break;
    }
    return entity;
};

Map.prototype.addNPC = function(npc)
{
    if (npc.name && npc.startTile && npc.endTile)
    {
        var npcDefinition = NPCDefinitionForName(npc.name);
        var route =
        {
            startX: npc.startTile.x * TileWidth,
            startY: npc.startTile.y * TileHeight,
            endX: npc.endTile.x * TileWidth,
            endY: npc.endTile.y * TileHeight,
            // pause at each endpoint
            pauseTime: npcDefinition.pauseTime,
            moveTime: npcDefinition.moveTime
        };
        var npcEntity = new NPC(npc.startTile.x,
                                npc.startTile.y,
                                npcDefinition.spriteSheet,
                                route);
        this.addEntity(npcEntity);
    }
}

Map.prototype.addNPCWithCharacter = function(character, x, y)
{
    var isNPC = false;
    var npcDefinition = NPCDefinitionForCharacter(character);
    if (npcDefinition)
    {
        isNPC = true;
        if (character === npcDefinition.startCharacter)
        {
            this.addNPCStart(npcDefinition, x, y);
        }
        // to else or not to else, that is the question
        if (character === npcDefinition.endCharacter)
        {
            this.addNPCEnd(npcDefinition, x, y);
        }
    }
    return isNPC;
};


Map.prototype.startNPC = function(character, x, y)
{
    var route = {
        character:character,
        startTile:{x:x, y:y},
        endTile:{x:0,y:0}
    };
};

Map.prototype.addNPCStart = function(npcDefinition, x, y)
{
    var npcs = this.npcsForDefinition(npcDefinition);
    var npc = null;
    for (var i in npcs)
    {
        var oldNPC = npcs[i];
        if (oldNPC.endTile
            && !oldNPC.startTile
            && (oldNPC.endTile.x == x
                || oldNPC.endTile.y == y))
        {
            oldNPC.startTile = {x:x, y:y};
            npc = oldNPC;
            break;
        }
    }
    if (!npc)
    {
        npc = {name : npcDefinition.name, startTile : {x:x, y:y}};
        npcs.push(npc);
    }
    else if (npc.startTile && npc.endTile)
    {
        this.addNPC(npc);
    }
};

Map.prototype.addNPCEnd = function(npcDefinition, x, y)
{
    var npcs = this.npcsForDefinition(npcDefinition);
    var npc = null;
    for (var i in npcs)
    {
        var oldNPC = npcs[i];
        if (oldNPC.startTile
            && !oldNPC.endTile
            && (oldNPC.startTile.x == x
            || oldNPC.startTile.y == y))
        {
            oldNPC.endTile = {x:x, y:y};
            npc = oldNPC;
            break;
        }
    }
    if (!npc)
    {
        npc = {name : npcDefinition.name, startTile : {x:x, y:y}};
        npcs.push(npc);
    }
    else if (npc.startTile && npc.endTile)
    {
        this.addNPC(npc);
    }
};

Map.prototype.npcsForDefinition = function(npcDefinition)
{
    var name = npcDefinition.name;
    var npcs = this.npcsByName[name];
    if (!npcs)
    {
        var npc =
        npcs = [];
        this.npcsByName[name] = npcs;
    }
    return npcs;
}

Map.prototype.printRows = function()
{
    console.log("Rows for map: "+this.name);
    for (var i in this.rows)
    {
        var row = this.rows[i];
        console.log(row);
    }
};

Map.prototype.printEntities = function()
{
    console.log("Entities for map: "+this.name);
    for (var x in this.entities)
    {
        var row = this.entities[x];
        for (var y in row)
        {
            var column = row[y];
            for (var z in column)
            {
                var stack = column[z];
                console.log("("+x+","+y+","+z+") "+stack);
            }
        }
    }
};
