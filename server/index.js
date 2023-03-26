require('dotenv').config();

const Application = require('./setup/app');

const { SERVER_HOST, SERVER_PORT } = process.env;
const PORT = SERVER_PORT || 8000;
const HOST = SERVER_HOST || '0.0.0.0';

Application().then((server) => {
  server.listen(PORT, HOST, () => console.log('Server on port', PORT, HOST));
  require('./setup/io');
}).then().catch((err) => {
  throw err;
});
