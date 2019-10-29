class Status {
  constructor() {
    if (Status.instance) {
      return Status.instance;
    }

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

  async getcandidate() {
    this.IO = ['Carl', 'Mark', 'Sam'];
    return this.IO;
  }

  getmanWhowillBuild() {
    const size = this.IO.length - 1;
    const cnt = Math.floor(Math.random() * size);
    this.id = cnt;
    this.name = this.IO[cnt];

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
