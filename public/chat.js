const socket = io.connect('https://node-trade-chat.herokuapp.com/');

var typing = false;
var timeout = undefined;

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
	message.value = "";
});

socket.on('chat', function(data){
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

message.addEventListener('keydown', function(){
	onKeyDownNotEnter();
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('noLongerTyping', function(){
	feedback.innerHTML = "";
});

function timeoutFunction(){
  typing = false;
  socket.emit('noLongerTyping');
  
}

function onKeyDownNotEnter(){
  if(typing === false) {
    typing = true;
    socket.emit('typing', handle.value);
    timeout = setTimeout(timeoutFunction, 1500);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 1500);
  }
}

var input = document.getElementById("message");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("send").click();
  }
});
