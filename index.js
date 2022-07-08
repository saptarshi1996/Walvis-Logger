require('dotenv').config();

const express = require('express');
const path = require('path');
const stream = require('stream');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io', {
  cors: {
    origin: '*',
  },
})(http);

const authRoutes = require('./routes/auth');
const containerRoutes = require('./routes/container');

const { docker } = require('./services/dockerode');
const { HOST, PORT } = process.env;

app.use(express.static("dist"));
app.use(cors());

// Render webpage after build.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use('/auth', authRoutes);
app.use('/container', containerRoutes);

http.listen(PORT, HOST, () => console.log('Server on PORT', PORT));

io.on('connection', socket => {

  socket.on('fetchLogs', async data => {
    const payload = JSON.parse(data);
    const socketId = socket.id;
    streamLogs({
      socketId,
      containerId: payload.containerId,
    });
  });

  socket.on('disconnect', reason => {
    console.log(reason)
  });

});

const streamLogs = async ({
  socketId,
  containerId,
}) => {
  try {
    const container = await docker.getContainer(containerId);
    const logStream = new stream.PassThrough();
    logStream.on('data', function (chunk) {
      const data = chunk.toString('utf8');
      io.to(socketId).emit('sendLogs', data);
    });

    container.attach({
      logs: true,
      stream: true,
      stdout: true,
      stderr: false,
      tty: false,
    }, function (err, stream) {
      if (err)
        logStream.end('!stop!');
      container.modem.demuxStream(stream, logStream, logStream);
      stream.on('end', function () {
        logStream.end('!stop!');
      });
    });
  } catch (ex) {
    console.log(ex);
    io.to(socketId).emit('closed');
  }
};
