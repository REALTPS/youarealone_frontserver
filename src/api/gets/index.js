const Router = require('koa-router');
const gets = new Router();
const ip = require('../ip');
var Client = require('node-rest-client').Client;

var client = new Client();

const getHistoryFromBackend = () => {
  return new Promise(resolve => {
    client.get(`${ip}/history/all`, data => {
      resolve(data);
    });
  });
};
const getHistory = async ctx => {
  const c = await getHistoryFromBackend();
  // console.log(c);
  ctx.body = {
    confirm: 'OK',
    history: c,
  };
};

gets.get('/history', getHistory);

module.exports = gets;
