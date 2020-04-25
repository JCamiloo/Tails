var socket = io();
socket.on('connect', function() {
  console.log('Connected');
});
socket.on('disconnect', function() {
  console.log('Lost connection');
});

socket.emit('sendMessage', { user: 'Juan', message: 'Hello World' }, function(resp) {
  console.log('Server response:', resp);
});
socket.on('sendMessage', function(message) {
  console.log('Server message:', message);
});