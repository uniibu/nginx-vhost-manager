const { ValidationError } = require('koa-bouncer');
exports.catchError = () => async function catchError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err instanceof ValidationError) {
      ctx.fail(err.message);
    } else if (err.status == 401 && err.name == 'UnauthorizedError') {
      if (ctx.cookies.get('token')) {
        ctx.cookies.set('token', null);
      }
      ctx.unauthorized('Invalid token');
    } else if (typeof err === 'string') {
      ctx.fail(err);
    } else {
      console.error({ error: err.stack || err.message });
      ctx.internalServerError('Internal_Error');
    }
    ctx.app.emit('error', err, ctx);
  }
};
const statusCodes = {
  ok: 200,
  fail: 400,
  noContent: 204,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500
};
exports.jsonRespond = () => async function respond(ctx, next) {
  for (const [status, code] of Object.entries(statusCodes)) {
    ctx[status] = msg => {
      const success = code == 200;
      const payload = { success };
      if (msg && success) payload.data = msg;
      else if (msg && !success) payload.error = msg;
      ctx.status = code;
      ctx.body = payload;
    };
  }
  await next();
};