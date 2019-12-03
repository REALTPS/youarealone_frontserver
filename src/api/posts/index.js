const Router = require('koa-router');
const bodyParser = require('koa-body');
const Status = require('../status').Status;
const st = new Status();
const posts = new Router();
const Socket = require('../io/socket').Socket;
const io = new Socket();
const ip = require('../ip');
var Client = require('node-rest-client').Client;

var client = new Client();

const getstatus = ctx => {
  ctx.body = { confirm: 'data', status: st.status, name: st.name, id: st.id };
};

const getcandidatefromBackend = () => {
  return new Promise((resolve, reject) => {
    st.getcandidate(e => {
      resolve(e);
    });
  });
};

const getcandidate = async ctx => {
  const e = await getcandidatefromBackend();
  ctx.body = {
    confirm: 'getcandidate',
    candidate: e,
  };
};

const startInterval = ctx => {
  if (st.status !== 0) {
    ctx.body = 'failed';
    return;
  }
  st.status = 1;
  io.broadcasting({ status: 1 });
  ctx.body = { confirm: 'start' };
  // st.startInterval();
};

const endInterval = ctx => {
  if (st.status !== 1) {
    ctx.body = 'failed';
    return;
  }

  st.status = 2;
  st.name = st.getmanWhowillBuild().name;
  st.id = st.getmanWhowillBuild().id;
  const sendpacket = {
    status: st.status,
    name: st.name,
    id: st.id,
  };
  io.broadcasting(sendpacket);
  ctx.body = {
    confirm: 'end',
  };
};

posts.get('/status', getstatus);
posts.get('/candidate', getcandidate);
posts.post('/start', startInterval);
posts.post('/end', endInterval);
posts.post('/setdata', bodyParser(), ctx => {
  if (st.status !== 2) {
    ctx.body = 'failed';
    return;
  }
  const getMyValue = ctx.request.body;

  var args = {
    data: {
      name: getMyValue.name,
      company: getMyValue.customer,
      serial: getMyValue.serial,
      requester: getMyValue.requester,
    },
    headers: { 'Content-Type': 'application/json' },
  };
  console.log(args);
  try {
    client.post(`${ip}/history/add`, args, function(data, response) {
      console.log('This time : ' + data);
    });
  } catch (e) {
    console.log('the Error is ' + e);
  }
  io.broadcasting({ status: 0 });
  io.historyChanged({ confirm: 'OK' });
  st.initialState();
  ctx.body = { confirm: 'Submitted' };
  //serial company name
});

module.exports = posts;
