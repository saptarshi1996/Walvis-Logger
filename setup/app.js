require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();

const authMiddleware = require('../middlewares/auth');

const authRoute = require('../routes/auth');
const dockerRoute = require('../routes/docker');

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

const distRouter = express.Router();
const apiRouter = express.Router();

// Render webpage after build.
distRouter.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

apiRouter.use('/auth', authRoute);
apiRouter.use('/docker', authMiddleware, dockerRoute);

app.use('/api', apiRouter);
app.use(process.env.END_POINT || '/', distRouter);

const server = http.createServer(app);

module.exports = server;
