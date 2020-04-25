const { io } = require('../server');

io.on('connection', (client) => {
  console.log('User connected');
  client.emit('sendMessage', { user: 'admin', message: 'Welcome' });

  client.on('disconnect', () => {
    console.log('User disconnected')
  });

  client.on('sendMessage', (data, callback) => {
    client.broadcast.emit('sendMessage', data);
    // if (data.user) {
    //   callback('Success');
    // } else {
    //   callback('Fail');
    // }
  });
});