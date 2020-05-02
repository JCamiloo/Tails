var socket = io();
var label = $('#lblNewTicket');

socket.on('connect', function() {
  console.log('connected');
});

socket.on('disconnect', function() {
  console.log('disconnected');
});

$('button').on('click', function() {
  socket.emit('nextTicket', null, function(nextTicket){
    label.text(`Ticket ${nextTicket}`)
  });
});