const Router = require('koa-router');
const posts = require('./posts');
const gets = require('./gets');

const api = new Router();

api.use('/posts', posts.routes());
api.use('/gets', gets.routes());

module.exports = api;
