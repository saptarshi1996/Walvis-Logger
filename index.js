require('dotenv').config();

const express = require('express');
const path = require('path');
const io = require('socket.io');

const apiRoutes = require('./routes');

const app = express();

const { HOST, PORT } = process.env;

app.use(express.static("build"));

// Render webpage after build.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use('/api', apiRoutes);

app.listen(PORT, HOST, () => console.log('Server on PORT', PORT));
