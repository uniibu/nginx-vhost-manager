const Router = require('koa-router');
const { PREFIX, SECRET } = require('../config');
const router = new Router({ prefix: `/${PREFIX}` });
const jwt = require('koa-jwt');
//const ensureUser = require('../lib/ensureUser');
// public
require('./public')(router);
// private
router.use(jwt({ secret: SECRET }));
require('./private')(router);
module.exports = router;