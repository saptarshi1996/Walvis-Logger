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

const distRouter = express.Router();

// Render webpage after build.
distRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(process.env.END_POINT || '/', distRouter);

app.use('/auth', authRoutes);
app.use('/container', containerRoutes);

http.listen(PORT, HOST, () => console.log('Server on PORT', PORT));

let socketStream = {};

io.on('connection', socket => {

  socket.on('fetchLogs', async data => {
    const payload = JSON.parse(data);
    const socketId = socket.id;

    streamLogs({
      socketId,
      containerId: payload.containerId,
    });
  });

  socket.on('closeLogger', async data => {
    if (socketStream && socketStream[socket.id]) {
      // Destroy the stream.
      console.log('killing stream');
      await socketStream[socket.id].destroy();
    }
  });

  socket.on('disconnect', async reason => {
    if (socketStream && socketStream[socket.id]) {
      console.log('kill old stream');
      await socketStream[socket.id].destroy();
    }
    console.log(reason);
  });

});

const streamLogs = async ({
  socketId,
  containerId,
}) => {

  const logStream = new stream.PassThrough();

  try {
    const container = await docker.getContainer(containerId);
    logStream.on('data', function (chunk) {
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
      tail: 1
    }, async (err, stream) => {

      // close previous stream.
      if (socketStream && socketStream[socketId]) {
        console.log('kill old stream');
        await socketStream[socketId].destroy();
      }
      socketStream[socketId] = stream;

      if (err) {
        logStream.end('!!!!!stop!!!!!');
        stream.destroy();
      }

      container.modem.demuxStream(stream, logStream, logStream);
      stream.on('end', function () {
        logStream.end('!!!!!stop!!!!!');
        stream.destroy();
      });
      
    });

  } catch (ex) {
    console.log(ex);
    logStream.end('!stop!');
  }
};
