require('dotenv').config();

const express = require('express');
const cors = require('cors');
const stream = require('stream');
const http = require('http');

const authRoute = require('./routes/auth');
const dockerRoute = require('./routes/docker');

const dockerService = require('./services/docker');

const {
  PORT,
  HOST,
} = process.env;

const app = express();
const server = http.createServer(app);

const io = require('socket.io', {
  cors: {
    origin: '*',
  },
})(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

const router = express.Router();

router.use('/auth', authRoute);
router.use('/docker', dockerRoute);

app.use('/', router);

server.listen(PORT, HOST, () => console.log('Server on port', PORT));

const socketStream = {};

const streamLogs = async ({
  socketId,
  containerId,
}) => {
  const logStream = new stream.PassThrough();

  try {
    const container = await dockerService.getContainer({
      id: containerId,
    });

    logStream.on('data', (chunk) => {
      const data = chunk.toString('utf8');
      const [date, time] = new Date().toISOString().split('T');
      io.to(socketId).emit('sendLogs', JSON.stringify({
        log: data,
        timeStamp: `${date} ${time.substring(0, 8)}`,
        containerId,
      }));
    });

    container.logs({
      follow: true,
      stdout: true,
      stderr: true,
      tail: 1,
    }, async (err, streams) => {
      // close previous stream.
      if (socketStream && socketStream[socketId]) {
        console.log('kill old stream');
        await socketStream[socketId].destroy();
      }
      socketStream[socketId] = streams;

      if (err) {
        logStream.end('!!!!!stop!!!!!');
        streams.destroy();
      }

      container.modem.demuxStream(streams, logStream, logStream);
      streams.on('end', () => {
        logStream.end('!!!!!stop!!!!!');
        streams.destroy();
      });
    });
  } catch (ex) {
    console.log(ex);
    logStream.end('!stop!');
  }
};

const tidy = (s) => {
  const rem = typeof s === 'string'
    // eslint-disable-next-line no-control-regex
    ? s.replace(/[\x00-\x1F\x7F-\xA0]+/g, '')
    : s;
  return rem.substring(1, rem.length);
};

const streamLogsStatic = async ({
  socketId,
  containerId,
}) => {
  try {
    const container = await dockerService.getContainer({
      id: containerId,
    });

    const logs = await container.logs({
      follow: false,
      stdout: true,
      stderr: true,
    });

    const data = logs.toString('utf-8');
    const logsList = data.split('\n');
    const logsCleared = logsList.map((log) => {
      const cleared = tidy(log);
      const [date, time] = new Date().toISOString().split('T');
      return {
        log: cleared,
        timeStamp: `${date} ${time.substring(0, 8)}`,
        containerId,
      };
    });

    io.to(socketId).emit('sendLogsStatic', JSON.stringify({
      log: logsCleared,
      containerId,
    }));
  } catch (ex) {
    console.log(ex);
  }
};

io.on('connection', (socket) => {
  socket.on('fetchLogs', async (data) => {
    const payload = JSON.parse(data);
    const socketId = socket.id;

    streamLogs({
      socketId,
      containerId: payload.containerId,
    });
  });

  socket.on('fetchLogsStatic', async (data) => {
    const payload = JSON.parse(data);
    const socketId = socket.id;

    streamLogsStatic({
      socketId,
      containerId: payload.containerId,
    });
  });

  socket.on('closeLogger', async () => {
    if (socketStream && socketStream[socket.id]) {
      // Destroy the stream.
      console.log('killing stream');
      await socketStream[socket.id].destroy();
    }
  });

  socket.on('disconnect', async (reason) => {
    if (socketStream && socketStream[socket.id]) {
      console.log('kill old stream');
      await socketStream[socket.id].destroy();
    }
    console.log('socket id', socket.id, reason);
  });
});
