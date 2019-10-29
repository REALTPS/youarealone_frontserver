const Koa = require('koa');
const app = new Koa();
const http = require('http');
var server = http.createServer(app.callback());
const io = require('socket.io')(server);

var port = process.env.PORT || 4600;

class Socket {
  constructor() {
    if (Socket.instance) {
      return Socket.instance;
    }
    return Socket.instance;
  }

  startSocketServer() {
    server.listen(port, () => {
      console.log(`Opened Server at ${port}`);
    });
    io.on('connection', function(socket) {
      socket.on('status', function(data) {
        //process the data here
        console.log(data);

        // emit an event
        console.log('responding with news');
        this.status = data.status;
        // io.sockets.emit('status', { status: this.status });
      });
    });
  }
  broadcasting(status) {
    console.log(status);
    io.sockets.emit('status', { status: status });
  }
}

module.exports.Socket = Socket;
