'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const PORT = appEnv.port;

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});