/* global require */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];
server.listen(process.env.PORT || 8080);
console.log("Listening at port 8080..!!!");

// Static file
app.use(express.static('public'));

//listening 		call-back Function
io.on('connection', function (socket) {

	"use strict";
	users.push(socket);
	console.log('Made Socket Connection with id = ', socket.id);
	console.log('Current User = ' + users.length);

	//Disconnect
	socket.on('disconnect', function () {
		console.log('user disconnected');
		users.splice(users.indexOf(socket), 1);
		console.log('Current Active User = ' + users.length);
	});
	
	
	
	socket.on('chat', function (data) {
		io.emit('chat', data);
	});
	
	//
	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data);
	});
});