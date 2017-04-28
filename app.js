// 'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const PORT = appEnv.port;

var users = [];

app.use(require('express').static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('setUsername', (data) => {
    console.log(data);
    if(users.indexOf(data) > -1){
    	io.emit('userExists', data + ' username is taken! Try some other username.');
    }
    else{
    	console.log('Into to chat : ' + data)
    	users.push(data);
    	socket.emit('userSet', {username: data});
    }

  });
  socket.on('msg',(data) => {
  	//Send a message to everyone
    console.log(data.message);
  	io.sockets.emit('newmsg', data);

  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});