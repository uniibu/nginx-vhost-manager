const localtunnel = require('localtunnel');
const currcwd = process.cwd();
process.chdir('./api');
const apistart = require('./api/index');
const { Nuxt, Builder, Generator } = require('nuxt');
const startapi = () => new Promise(resolve => {
  const api = localtunnel(8081, { host: 'https://unibtc.me' }, (err) => {
    if (err) console.error(err);
  });
  api.on('url', (url) => {
    resolve(url);
  });
  api.on('request', (info) => {
    console.log('api request', info);
  });
  api.on('close', () => {
    console.log('api tunnel close');
  });
});
const guibuild = apiurl => new Promise((resolve, reject) => {
  process.env.APIHOST = apiurl;
  process.chdir(currcwd);
  const config = require('./nuxt.config.js');
  const nuxt = new Nuxt(config);
  const builder = new Builder(nuxt);
  const generator = new Generator(nuxt, builder);
  generator.generate().then(() => {
    resolve();
  }).catch((e) => {
    console.error(e);
    reject();
    process.exit(1);
  });
});
const startgui = () => {
  const gui = localtunnel(8080, { host: 'https://unibtc.me' }, (err) => {
    if (err) console.error(err);
  });
  gui.on('url', (url) => {
    console.log('gui url', url);
  });
  gui.on('request', (info) => {
    console.log('gui request', info);
  });
  gui.on('close', () => {
    console.log('gui tunnel close');
  });
};
apistart(async () => {
  const apiurl = await startapi();
  console.log('api url', apiurl);
  await guibuild(apiurl);
  startgui();
});