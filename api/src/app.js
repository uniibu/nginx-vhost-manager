const Koa = require('koa');
const kreq = require('koa-req');
const config = require('./config');
const mw = require('./middleware');
const app = new Koa();
app.env = config.NODE_ENV;
app.port = config.PORT;
app.proxy = config.TRUST_PROXY;
kreq(app, {
  loggerEnabled: true,
  corsEnabled: true,
  helmetEnabled: true,
  cors: {
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
    allowHeaders: ['Authorization'],
    maxAge: 86400
  }
});
app.use(
  require('koa-bodyparser')({
    extendTypes: { json: ['text/plain'] },
    enableTypes: ['json'],
    onerror({ stack, message }, ctx) {
      console.error(stack || message);
      ctx.throw(422, { error: 'Error parsing request' });
    }
  })
);
app.use(require('koa-bouncer').middleware());
app.use(mw.catchError());
app.use(mw.jsonRespond());
const router = require('./routes');
app.use(router.routes());
app.use(router.allowedMethods());
/*
app.on('error', (err) => {
  console.error(err.stack || err.message);
});
*/
app.use((ctx) => {
  ctx.notFound('Api endpoint not found');
});
module.exports = app;