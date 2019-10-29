var Client = require('node-rest-client').Client;

var client = new Client();

class Status {
  constructor() {
    if (Status.instance) {
      return Status.instance;
    }
    this.IO = ['Sam', 'Carl', 'Hugh', 'Mark'];
    this.tick = 0;
    this.status = 0;
    return Status.instance;
  }

  timer() {
    this.tick += 1;
    this.tick %= 1200000;
    console.log(this.tick);
  }

  startInterval() {
    this.status = 1;
    console.log('start');

    // this.interval = setInterval(this.timer.bind(this), 4);
  }

  getcandidate(callback) {
    const th = this;
    client.get('http://192.168.0.74:8080/member/all', function(data, response) {
      console.log(data.length);

      th.IO.length = 0;
      for (let i = 0; i < data.length; i++) {
        th.IO.push(data[i].name);
      }

      console.log('ddd' + th.IO);
      callback(th.IO);
    });
  }

  getmanWhowillBuild() {
    const size = this.IO.length - 1;
    const cnt = Math.floor(Math.random() * size);
    this.id = cnt;
    this.name = this.IO[cnt];
    console.log(this.IO, cnt);

    return { name: this.namee, id: this.id };
  }

  endInterval() {
    this.status = 2;
    console.log('end');
    // clearInterval(this.interval);
  }

  initialState() {
    this.status = 0;
    console.log('submitted');
  }
}

module.exports.Status = Status;
