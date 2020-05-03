const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')
const ticket = new TicketControl();

io.on('connection', (client) => {

  client.on('nextTicket', (data, callback) => {
    const next = ticket.next();
    callback(next);
  });

  client.emit('currentTicket', { 
    currentTicket: ticket.getCurrentTicket(),
    lastFourTickets: ticket.getLastFourTickets()
  });

  client.on('attendTicket', (data, callback) => {
    if (!data.desktop) {
      return callback({
        error: true,
        message: 'Desktop code is mandatory'
      });
    }
    const attendTicket = ticket.attendTicket(data.desktop);
    callback(attendTicket);
    client.broadcast.emit('lastFourTickets', { lastFourTickets: ticket.getLastFourTickets() });
  });
});