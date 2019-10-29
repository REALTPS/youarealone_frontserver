const Router = require('koa-router');
const bodyParser = require('koa-body');
const Status = require('../status').Status;
const st = new Status();
const posts = new Router();
const Socket = require('../io/socket').Socket;
const io = new Socket();

const getstatus = ctx => {
  ctx.body = { confirm: 'data', status: st.status, name: st.name, id: st.id };
};

const getcandidate = ctx => {
  st.getcandidate().then(e => {
    ctx.body = {
      confirm: 'getcandidate',
      candidate: e,
    };
  });
};

const startInterval = ctx => {
  if (st.status !== 0) {
    ctx.body = 'failed';
    return;
  }
  console.log('eee3');
  st.status = 1;
  io.broadcasting(1);
  ctx.body = { confirm: 'start' };
  // st.startInterval();
};

const endInterval = ctx => {
  console.log('whatis' + st.status);
  if (st.status !== 1) {
    ctx.body = 'failed';
    return;
  }

  st.status = 2;
  st.name = st.getmanWhowillBuild().name;
  st.id = st.getmanWhowillBuild().id;
  console.log('eee');
  io.broadcasting(2);
  ctx.body = {
    confirm: 'end',
    name: st.name,
    id: st.id,
  };
};

posts.get('/status', getstatus);
posts.get('/candidate', getcandidate);
posts.post('/start', startInterval);
posts.post('/end', endInterval);
posts.post('/setdata', bodyParser(), async ctx => {
  if (st.status !== 2) {
    ctx.body = 'failed';
    return;
  }
  const getMyValue = ctx.request.body;
  console.log('mavel' + getMyValue);
  ctx.body = { confirm: 'data' };
  io.broadcasting(0);
  st.initialState();
});

module.exports = posts;
