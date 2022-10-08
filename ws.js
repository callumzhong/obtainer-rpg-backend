const ws = (wss) => {
  wss.on('connection', (_ws) => {
    console.log('Client connected');
    _ws.on('message', (data) => {
      const message = data.toString();
      const { clients } = wss;
      clients.forEach((client) => {
        client.send(message);
      });
    });

    _ws.on('close', () => {
      console.log('Close connected');
    });
  });
};

module.exports = ws;
