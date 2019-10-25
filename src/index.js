const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const api = require('./api');
const cors = require('@koa/cors');
const mount = require('koa-mount');
const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

const static_pages = new Koa();
static_pages.use(serve(__dirname + '/build')); //serve the build directory
app.use(mount('/', static_pages));

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4500, () => {
  console.log('Connected');
});
