// Map.js

var Map = function(name, stage, rows)
{
    this.name = name;
    this.stage = stage;
    this.rows = rows;

    this.rowCount = this.rows.length;
    this.columnCount = this.rows[0].length;

    this.entities = [];
    this.parseRows();
};

Map.prototype.removeEntity = function(entity)
{
    var x = entity.getTileX();
    var y = entity.getTileY();
    if (this.entities[x]) {
        if (this.entities[x][y]) {
            var entityList = this.entities[x][y];
            for(var i = 0; i < entityList.length; i++) {
                if (entityList[i] === entity) {
                    entityList.splice(i, 1);
                    break;
                }
            }
        }
    }
};

Map.prototype.addEntity = function(entity)
{
    if (entity != null)
    {
        var x = entity.getTileX();
        var y = entity.getTileY();
        if (this.entities[x]) {
            if (this.entities[x][y]) {
                this.entities[x][y].push(entity);
            }
        }
        this.stage.addChild(entity);
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
    x *= TileWidth;
    y *= TileHeight;
    switch (character)
    {
        case "#":
            // wall
            entity = new Wall(x, y);
            break;
        case " ":
            // floor
            entity = null;
            break;
        case "P":
            // floor
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
        default:
            console.log("Unknown map character: "+character);
            break;
    }
    return entity;
};

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
