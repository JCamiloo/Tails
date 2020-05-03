var socket = io();
var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('desktop')) {
  window.location = 'index.html';
  throw new Error('Desktop code is mandatory');
}

var desktop = searchParams.get('desktop');
var label = $('small');

$('h1').text('Escritorio ' + desktop);
$('button').on('click', function() {
  socket.emit('attendTicket', { desktop: desktop }, function(resp) {
    if (resp === -1) {
      $('h4').text('No tickets left');
      return;
    } else {
      label.text('ticket ' + resp.number);
    }
  });
});