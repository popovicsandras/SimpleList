// Lightweight express server for Heroku

'use strict';

var express = require('express'),
	port = process.env.PORT || 8101,
	app = express(),
	path = require('path'),
	server;

//set logging
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});

// mount static
app.use(express.static( path.join( __dirname, 'www') ));

// route index.html
app.get('/', function(req, res)
{
	res.sendfile( path.join( __dirname, 'www/index.html' ) );
});

server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
})
