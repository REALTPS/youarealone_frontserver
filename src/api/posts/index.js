const Router = require('koa-router');
const posts = new Router();

let tick = 0;
const timer = () => {
  tick += 1;
  tick %= 1200000;
};
let interval;
const startInterval = ctx => {
  console.log('start');
  ctx.body = 'start';
  interval = setInterval(timer, 1);
};

const endInterval = ctx => {
  console.log('end');
  ctx.body = tick;
  clearInterval(interval);
};

const print = ctx => {
  ctx.body = tick;
};

posts.get('/', print);
posts.post('/start', startInterval);
posts.post('/end', endInterval);

module.exports = posts;
