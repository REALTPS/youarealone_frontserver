const Koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const serve = require('koa-static');
const api = require('./api');
const cors = require('@koa/cors');
const mount = require('koa-mount');
const app = new Koa();
const router = new Router();
const Status = require('./api/status').Status;
const Socket = require('./api/io/socket').Socket;

const PORT = 4500;

const io = new Socket();

const st = new Status();

io.startSocketServer();
const static_pages = new Koa();
static_pages.use(serve(__dirname + '/build')); //serve the build directory
app.use(mount('/', static_pages));
router.use('/api', api.routes());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Opened Server at ${PORT}`);
});
