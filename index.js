require('dotenv').config();

const express = require('express');

const {
  PORT,
  HOST,
} = process.env;

const app = express();

app.listen(PORT, HOST, () => console.log('Server on port', PORT));
