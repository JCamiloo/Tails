const { io } = require('../server');

io.on('connection', (client) => {
  console.log('User connected');
  client.emit('sendMessage', { user: 'admin', message: 'Welcome' });

  client.on('disconnect', () => {
    console.log('User disconnected')
  });

  client.on('sendMessage', (message, callback) => {
    if (message.user) {
      callback('Success');
    } else {
      callback('Fail');
    }
  });
});