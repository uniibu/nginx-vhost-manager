const jwt = require('jsonwebtoken');
const { SECRET, PASSWORD } = require('../config');
const retryCache = require('lru-cache')({ maxAge: 1000 * 60 });
module.exports = router => {
  router.post('/login', ctx => {
    let retries = retryCache.get(ctx.ip);
    if (retries && retries >= 5) {
      return ctx.fail('Try again later');
    }
    ctx.validateBody('password').required('Invalid password').isString();
    if (ctx.vals.password !== PASSWORD) {
      retries = retries ? retries + 1 : 1;
      retryCache.set(ctx.ip, retries);
      return ctx.fail('Invalid password');
    }
    const token = jwt.sign({ admin: true }, SECRET, { expiresIn: '1h' });
    retryCache.del(ctx.ip);
    ctx.ok({ token });
  });

};