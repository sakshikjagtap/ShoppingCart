const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');

const onConnection = (socket, handler) => {
  socket.on('error', (err) => { })
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    console.log(request.method, request.path);
    handler(request, response);
  });
};

const startServer = (PORT, handler, serveFrom) => {
  const server = createServer((socket) =>
    onConnection(socket, handler, serveFrom)
  );

  server.listen(PORT, () => console.log('started listening 9999'));
};

module.exports = { startServer, onConnection };
