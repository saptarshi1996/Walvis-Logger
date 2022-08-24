const stream = require('stream');

const server = require('./app');
const dockerService = require('../services/docker');

const io = require('socket.io', {
  cors: {
    origin: '*',
  },
})(server);

const socketStream = {};

async function streamLogs({
  socketId,
  containerId,
}) {
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

    // Get containers.
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
}

async function streamLogsStatic({
  socketId,
  containerId,
}) {
  try {
    const container = await dockerService.getContainer({
      id: containerId,
    });

    const logs = await container.logs({
      follow: false,
      stdout: true,
      stderr: true,
      tail: 10000,
    });

    const data = logs.toString('utf-8');
    const logsList = data.split('\n');
    const logsCleared = logsList.map((log) => {
      const [date, time] = new Date().toISOString().split('T');
      return {
        log,
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
}

console.log('Socket connected');
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

module.exports = io;
