const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')
const ticket = new TicketControl();

io.on('connection', (client) => {

  client.on('nextTicket', (data, callback) => {
    const next = ticket.next();
    callback(next);
  });

  client.emit('currentTicket', { currentTicket: ticket.current() });
});