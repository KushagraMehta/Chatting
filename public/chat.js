//Make connection
var socket = io();
// Query DOM
var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

//Emit Event
btn.addEventListener('click', function () {
	"use strict";
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});

});
message.addEventListener('keypress', function () {
	"use strict";
	socket.emit("typing", handle.value);
});

// Listen for events
socket.on('chat', function (data) {
	"use strict";
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong> ' + data.handle + ' </strong> ' + data.message + ' </p';
});
socket.on('typing', function (data) {
	"use strict";
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...' + '</em></p>';
});
