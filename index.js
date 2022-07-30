require('dotenv').config();

const express = require('express');

const authRoute = require('./routes/auth');
const dockerRoute = require('./routes/docker');

const {
  PORT,
  HOST,
} = process.env;

const app = express();

const router = express.Router();

router.use('/auth', authRoute);
router.use('/docker', dockerRoute);

app.use('/', router);

app.listen(PORT, HOST, () => console.log('Server on port', PORT));
