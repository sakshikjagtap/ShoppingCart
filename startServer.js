const { startServer } = require('./src/server');
const { serveFileContent } = require('./src/serveFileContent');

startServer(9999, serveFileContent);
