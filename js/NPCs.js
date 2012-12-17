// NPCs.js

NPCDefinitions = {
    Heather :
    {
        spriteSheet : Content.getSpriteSheet("HeatherTall.png"),
        moveTime : 400.0,
        pauseTime : 1000.0,
        startCharacter : "h",
        endCharacter : "H"
    },
    ShortGrandpa :
    {
        spriteSheet : Content.getSpriteSheet("M_Short_Grandpa.png"),
        moveTime : 1000.0,
        pauseTime : 500.0,
        startCharacter : "n",
        endCharacter : "N"
    },
    FlowerGirl :
    {
        spriteSheet : Content.getSpriteSheet("FlowerGirlToo.png"),
        moveTime : 1000.0,
        pauseTime : 1000.0,
        startCharacter : "f",
        endCharacter : "F"
    },
    Elvis :
    {
        spriteSheet : Content.getSpriteSheet("M_Elvis.png"),
        moveTime : 400.0,
        pauseTime : 1000.0,
        startCharacter : "e",
        endCharacter : "E"
    }
};

NPCNamesByCharacter = {};

for (var name in NPCDefinitions)
{
    var definition = NPCDefinitions[name];
    definition.name = name;
    NPCNamesByCharacter[definition.startCharacter] = name;
    NPCNamesByCharacter[definition.endCharacter] = name;
}

var NPCNameForCharacter = function(character)
{
    return NPCNamesByCharacter[character];
};

var NPCDefinitionForName = function(npcName)
{
    var npcDefinition;
    for (var name in NPCDefinitions)
    {
        if (name == npcName)
        {
            npcDefinition = NPCDefinitions[name];
            break;
        }
    }
    return npcDefinition;
}

var NPCDefinitionForCharacter = function(character)
{
    var npcDefinition = null;
    var npcName = NPCNameForCharacter(character);
    if (npcName != null)
    {
        npcDefinition = NPCDefinitionForName(npcName);
    }
    return npcDefinition;
};