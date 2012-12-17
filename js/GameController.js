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
	levelSelect.selectedIndex = (levelSelect.selectedIndex + 1)%levelSelect.options.length;
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
