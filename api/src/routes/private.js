const nginx = require('../nginx');
module.exports = router => {
  router.get('/sites', async ctx => {
    const sites = await nginx.getSites();
    ctx.ok({ sites });
  });
  router.post('/new', async ctx => {
    ctx.validateBody('name').required('Missing name').isString();
    ctx.validateBody('config').required('Missing configuration').isString();
    const formatConfig = nginx.format(ctx.vals.config);
    if (nginx.configExist(ctx.vals.name)) {
      return ctx.fail(`A vhost configuration with a filename of ${ctx.vals.name} already exists`);
    }
    await nginx.newVhost(ctx.vals.name, formatConfig);
    const checkConfig = await nginx.checkConfig(ctx.vals.name);
    if (!checkConfig) {
      return ctx.fail('Syntax Error, Config not saved');
    }
    ctx.ok();
  });
  router.post('/edit', async ctx => {
    ctx.validateBody('name').required('Missing name').isString();
    ctx.validateBody('config').required('Missing configuration').isString();
    const formatConfig = nginx.format(ctx.vals.config);
    if (!nginx.configExist(ctx.vals.name)) {
      return ctx.fail(`A vhost configuration with a filename of ${ctx.vals.name} dost not exists`);
    }
    await nginx.backVhost(ctx.vals.name);
    await nginx.delVhost(ctx.vals.name);
    await nginx.newVhost(ctx.vals.name, formatConfig);
    const checkConfig = await nginx.checkConfig(ctx.vals.name);
    if (!checkConfig) {
      await nginx.restoreBackVhost(ctx.vals.name);
      await nginx.delBackVhost(ctx.vals.name);
      return ctx.fail('Syntax Error, Config not saved');
    }
    await nginx.delBackVhost(ctx.vals.name);
    ctx.ok();
  });
  router.post('/del', async ctx => {
    ctx.validateBody('name').required('Missing name').isString();
    await nginx.delVhost(ctx.vals.name);
    ctx.ok();
  });
  router.post('/restart', async ctx => {
    const r = await nginx.restartNginx();
    if (!r) {
      return ctx.fail();
    }
    ctx.ok();
  });
};