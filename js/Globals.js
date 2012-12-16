// Globals.js

var TileWidth = 32;
var TileHeight = 32;

var Direction =
{
    Up : "up",
    Down : "down",
    Left : "left",
    Right : "right"
};

var MovementKeys =
{
    Up: 38,
    Left: 37,
    Down: 40,
    Right: 39,
    W: 87,
    A: 65,
    S: 83,
    D: 68
};

function lerp(start, end, amount) {
    var amt = clamp(amount, 0.0, 1.0);
    return ((end - start) *  amt) + start;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
