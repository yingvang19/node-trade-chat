const express = require('express');
const socket = require('socket.io');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port http://localhost:'+ app.get('port'));
});

const io = socket(server);

io.on('connection', function(socket){
	console.log('Made a connection: ' + socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});

	socket.on('noLongerTyping', function(){
		socket.broadcast.emit('noLongerTyping');
	});
});