var WebSocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});
wss.on('connection', function (ws) {
  ws.send('connected');
  ws.on('message', msg => {
    let data = msg.split(' ');
    let op = data[0];
    switch(op) {
    case 'list-current-users':
      ws.send(JSON.stringify({
        responseType: 'user-list',
        users: [{id:1,name:'Jeremy Mitchell'},{id:2,name:'Whitney Mitchell'}]
      }));
      break;
    case 'login':
      ws.send(JSON.stringify({
        responseType: 'token',
        token: 'test-token',
        username: 'Jeremy Mitchell'
      }))
      break;
    case 'logout':
      ws.send(JSON.stringify({
        responseType: 'token-clear'
      }))
      break;
    default:
      console.log('Unknown message - ' + msg);
    }
  });
});

server.on('request', app);
server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});