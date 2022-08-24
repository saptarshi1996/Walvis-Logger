require('dotenv').config();

const server = require('./setup/app');

const PORT = process.env.SERVER_PORT || 8000;
const HOST = process.env.SERVER_HOST || '0.0.0.0';
server.listen(PORT, HOST, () => console.log('Server on port', PORT));

require('./setup/io');
