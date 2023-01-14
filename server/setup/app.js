require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();

const authMiddleware = require('../middlewares/auth');

const authRoute = require('../routes/auth');
const dockerRoute = require('../routes/docker');

// app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

const apiRouter = express.Router();

apiRouter.use('/auth', authRoute);
apiRouter.use('/docker', authMiddleware, dockerRoute);

app.use('/api', apiRouter);

const server = http.createServer(app);

module.exports = server;
