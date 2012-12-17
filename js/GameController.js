// add levels to the level selector
var levelSelect = document.getElementById("levelSelect");
var levelDescription = document.getElementById("levelDescription");

var fartSound = document.getElementById("fartSound");
for (var i in Levels)
{
	levelSelect.add(new Option(i, i), null);
}

var gameController =
{
	canvas: null,
	stage: null,
	currentMap: null,
	objectsToDelete: [],
	currentLevelIndex: 0
};

gameController.loadNextLevel = function() {
	levelSelect.selectedIndex = levelSelect.selectedIndex + 1;
	onLevelSelectChanged(levelSelect);
};

gameController.reloadLevel = function() {
	this.loadLevelByIndex(levelSelect.selectedIndex);
};

gameController.loadLevelByIndex = function(index) {
	var count = 0;
	var name = null;
	for (var levelName in Levels)
	{
		if (count == index)
		{
			name = levelName
		}
		count++;
	}
	if (name != null)
	{
		this.loadLevelByName(name);
	}
};
gameController.loadLevelByName = function(name)
{
	var level = Levels[name];
	this.loadLevel(level, name);
};

gameController.loadLevel = function(level, name)
{
	this.currentMap = new Map(name, this.stage, level.map);
	console.log("New level is " + level.description);
	levelDescription.innerHTML = level.description;
	
	// Reset everything for the new map.
	this.stage.removeAllChildren();
	this.currentMap.parseRows();
	this.objectsToDelete = [];

	// Reset player fart count
	player.fartsRemaining = 10;
};

function getDistanceEntities() {
	return gameController.currentMap.distanceEntities;
};

function getEntityList(newTileX, newTileY) {
	return gameController.currentMap.getEntityList(newTileX, newTileY);
};

function addEntity(newEntity) {
	gameController.currentMap.addEntity(newEntity);
};

function removeEntity(newEntity)
{
	gameController.objectsToDelete.push(newEntity);
};

function removeEntityFromMap(newEntity)
{
	gameController.currentMap.removeEntityTilePosition(newEntity);
};

function onLevelSelectChanged(select)
{
	var selectedIndex = select.selectedIndex;
	var selectedValue = select.options[selectedIndex].value;
	gameController.loadLevelByName(selectedValue);
}

gameController.init = function()
{
	this.canvas = document.getElementById("gameCanvas");
	this.stage = new createjs.Stage(this.canvas);

	this.loadLevelByIndex(0);
};

gameController.tick = function()
{
	for(var i = 0; i < this.stage.children.length; i++) {
        var currentItem = this.stage.children[i];
		if (currentItem.tick) {
            if (currentItem.doCollisionChecks) {
                gameController.currentMap.removeEntityTilePosition(currentItem);
            }
			currentItem.tick();
            if (currentItem.doCollisionChecks) {
                gameController.currentMap.setEntityTilePosition(currentItem);
            }
		}
	}
	this.stage.update();

	for(var i = this.objectsToDelete.length - 1; i >= 0; i--) {
		this.stage.removeChild(this.objectsToDelete[i]);
		this.currentMap.removeEntityTilePosition(this.objectsToDelete[i]);
	}

	this.objectsToDelete = [];
};

function init()
{
	console.log("Initializing GameController");
    window.removeEventListener("keydown", init, true);
	gameController.init();

	addEntity(new NPC(2, 2, Content.getSpriteSheet("HeatherTall.png"), 
		{ startX: 2 * TileWidth,
		startY: 2 * TileHeight,
		endX: 16 * TileWidth,
		endY: 2 * TileHeight, 
		pauseTime: 1000.0, 
		moveTime: 400.0 }));
	addEntity(new NPC(2, 3, Content.getSpriteSheet("M_Short_Grandpa.png"), 
		{ startX: 2 * TileWidth,
		startY: 3 * TileHeight, 
		endX: 2 * TileWidth, 
		endY: 5 * TileHeight, 
		pauseTime: 500.0, 
		moveTime: 1000.0 }));
	addEntity(new NPC(4, 7, Content.getSpriteSheet("FlowerGirlToo.png"), 
		{ startX: 3 * TileWidth,
		startY: 7 * TileHeight,
		endX: 8 * TileWidth,
		endY: 7 * TileHeight,
		pauseTime: 0.0,
		moveTime: 10.0 }));

	//Hide title screen, show game, and start audio.
	document.getElementById('titleScreen').style.display = 'none';
	document.getElementById('gameDiv').style.display = 'block';
	document.getElementById('levelSelectForm').style.display = 'block';
	document.getElementById('soundDiv').style.display = 'block';
	document.getElementById('musicSound').play();

	// start game timer
	createjs.Ticker.addListener(gameController);
	createjs.Ticker.setFPS(60);

	gameController.stage.update();
};
