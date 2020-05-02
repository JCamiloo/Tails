const { io } = require('../server');
const { Ticket } = require('../classes/ticket')
const ticket = new Ticket();

io.on('connection', (client) => {

  client.on('nextTicket', (data, callback) => {
    const next = ticket.next();
    callback(next);
  });

  client.emit('currentTicket', { currentTicket: ticket.current() });
});