const fs = require('fs-extra');
const nginxDir = '/etc/nginx';
const path = require('path');
const Beautify = require('nginxbeautify');
const nginxFormat = new Beautify({ tabs: 0, spaces: 4 });
const execa = require('execa');
const resolve = (...p) => path.resolve(nginxDir, ...p);
exports.getSites = async () => {
  try {
    const availableSites = await fs.readdir(resolve('sites-available'));
    const enabledSites = await fs.readdir(resolve('sites-enabled'));
    return availableSites.reduce((acc, cur) => {
      acc[cur] = enabledSites.includes(cur);
      return acc;
    }, {});
  } catch (e) {
    console.error(e);
    return {};
  }
};
exports.configExist = fname => fs.existsSync(resolve('sites-available', fname));
exports.newVhost = (fname, conf) => fs.outputFile(resolve('sites-available', fname), conf);
const delVhost = exports.delVhost = async fname => {
  await fs.remove(resolve('sites-available', fname));
  await fs.remove(resolve('sites-enabled', fname));
};
exports.checkConfig = async (fname) => {
  try {
    await execa.shell(`ln -s ${resolve('sites-available', fname)} ${resolve('sites-enabled/')}`);
    await execa.shell('nginx -t');
    return true;
  } catch (e) {
    await delVhost(fname);
    return false;
  }
};
exports.backVhost = fname => fs.copy(resolve('sites-available', fname), resolve('sites-available', `${fname}.bak`));
exports.delBackVhost = fname => fs.remove(resolve('sites-available', `${fname}.bak`));
exports.restoreBackVhost = async fname => {
  await fs.copy(resolve('sites-available', `${fname}.bak`), resolve('sites-available', fname));
  await execa.shell(`ln -s ${resolve('sites-available', fname)} ${resolve('sites-enabled/')}`);
};
exports.restartNginx = async () => {
  try {
    await execa.shell('service nginx restart');
    return true;
  } catch (e) {
    return false;
  }
};
exports.format = conf => nginxFormat.parse(conf);