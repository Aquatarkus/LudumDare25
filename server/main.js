var express = require('express');
var util = require('util');

var app = express();
app.use(express.logger());
app.use(express.static(__dirname + '/../'));

var port = process.env.PORT || 3000;

app.listen(port, function(){
	util.log("Listening on " + port + ".");
});

module.exports = app;
