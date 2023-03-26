require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const authMiddleware = require('../middlewares/auth');

const authRoute = require('../routes/auth');
const userRoute = require('../routes/user');
const dockerRoute = require('../routes/docker');

module.exports = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const apiRouter = express.Router();

  apiRouter.use('/auth', authRoute);
  apiRouter.use('/user', authMiddleware, userRoute);
  apiRouter.use('/docker', authMiddleware, dockerRoute);

  app.use('/api', apiRouter);

  const server = createServer(app);

  return server;
};
