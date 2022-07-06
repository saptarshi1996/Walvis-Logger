require('dotenv').config();

const express = require('express');
const path = require('path');
const stream = require('stream');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io', {
  cors: {
    origin: '*',
  },
})(http);

const authRoutes = require('./routes/auth');
const dockerService = require('./services/dockerode');
const { HOST, PORT } = process.env;

app.use(express.static("build"));

// Render webpage after build.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use('/auth', authRoutes);

http.listen(PORT, HOST, () => console.log('Server on PORT', PORT));

io.on('connection', socket => {

  socket.on('fetchLogs', async data => {
    const payload = JSON.parse(data);
    const socketId = socket.id;
    console.log(payload);
    console.log(socketId);
    streamLogs({
      socketId,
      containerId: payload.containerId,
    })
  });

  socket.on('disconnect', reason => {
    console.log(reason)
  });

});

const streamLogs = async ({
  socketId,
  containerId,
}) => {

  const container = await dockerService.getContainerDetails({
    id: containerId,
  });

  const logStream = new stream.PassThrough();
  logStream.on('data', function (chunk) {
    console.log('stream');
    const data = chunk.toString('utf8');
    io.to(socketId).emit('sendLogs', data);
  });

  container.logs({
    follow: true,
    stdout: true,
    stderr: true
  }, function (err, stream) {
    if (err) {
      console.log(err);
    }
    container.modem.demuxStream(stream, logStream, logStream);
    stream.on('end', function () {
      logStream.end('!stop!');
    });

    setTimeout(function () {
      stream.destroy();
    }, 500);
  });

};
