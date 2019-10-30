const Router = require('koa-router');
const bodyParser = require('koa-body');
const Status = require('../status').Status;
const st = new Status();
const gets = new Router();
const Socket = require('../io/socket').Socket;
const io = new Socket();
var Client = require('node-rest-client').Client;

var client = new Client();

const getHistoryFromBackend = () => {
  return new Promise(resolve => {
    client.get('http://192.168.0.74:8080/history/all', data => {
      resolve(data);
    });
  });
};
const getHistory = async ctx => {
  const c = await getHistoryFromBackend();
  console.log(c);
  ctx.body = {
    confirm: 'OK',
    history: c,
  };
};

gets.get('/history', getHistory);

module.exports = gets;
