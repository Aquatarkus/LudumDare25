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
	currentLevelIndex: 0,
    inTitleScreen: false,
    isGameLoaded: false
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
    player.ready = false;
	player.fartsRemaining = 10;
    
    if (this.isGameLoaded) {
        gameController.showTitleScreen(level, name);
    }
};

gameController.gameMenuAction = function() {
    var result = true;
    
    if ((player.isDefeated) || (player.isVictorious) || (this.inTitleScreen) || (!this.isGameLoaded)) {
        if (!this.isGameLoaded) {
            console.log("INIT LOAD");
            this.isGameLoaded = true;
            gameController.reloadLevel();
        } else if (this.inTitleScreen) {
            console.log("HIDE TITLE");
            gameController.hideTitleScreen();
        } else {
            if (player.isDefeated) {
                console.log("RELOAD LEVEL");
                gameController.reloadLevel();
            } else if (player.isVictorious) {
                console.log("LOAD NEXT LEVEL");
                gameController.loadNextLevel();
            }
        }   
    } else {
        result = false;
    }
    
    return result;
};

gameController.showTitleScreen = function(map, name) {
    this.inTitleScreen = true;
    this.stage.clear();
    this.stage.canvas = null;
    document.getElementById('titleScreenTitle').innerHTML = name;
    document.getElementById('titleScreenDescription').innerHTML = map.description;
    //Hide title screen, show game, and start audio.
	document.getElementById('titleScreen').style.display = 'block';
    document.getElementById('gameCanvas').style.display = 'none';
    document.getElementById('gameDiv').style.display = 'none';
	document.getElementById('levelSelectForm').style.display = 'none';
	document.getElementById('soundDiv').style.display = 'none';
    document.getElementById('musicSound').paused = true;
};

gameController.hideTitleScreen = function() {
    this.inTitleScreen = false;
    this.stage.canvas = this.canvas;
    //Hide title screen, show game, and start audio.
	document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
	document.getElementById('gameDiv').style.display = 'block';
	document.getElementById('levelSelectForm').style.display = 'block';
	document.getElementById('soundDiv').style.display = 'block';
	document.getElementById('musicSound').play();
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
    player.isDefeated = true;
    levelSelect.selectedIndex = 0;
    this.reloadLevel();
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
	gameController.init();

	// start game timer
	createjs.Ticker.addListener(gameController);
	createjs.Ticker.setFPS(60);

	gameController.stage.update();
};
