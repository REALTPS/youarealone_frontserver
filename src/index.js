const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const cors = require('@koa/cors');
const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

router.get('/', ctx => {
  ctx.body = 'dddd';
});

var options = {
  origin: '*',
};
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4500, () => {
  console.log('Connected');
});
