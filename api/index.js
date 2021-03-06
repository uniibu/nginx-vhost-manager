const fs = require('fs-extra');
const path = require('path');
if (!fs.existsSync('../.env')) {
  console.error('The environment file .env is missing, please check README for instructions');
  process.exit();
}
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
if (!fs.existsSync('/etc/nginx') || !fs.existsSync('/etc/nginx/sites-available')) {
  console.error('Directory /etc/nginx or /etc/nginx/sites-available was not found.');
  process.exit();
}
if (process.getuid() !== 0) {
  console.error('Must be ran with sudo or as root user');
  process.exit();
}

function start(cb) {
  require('./src/guiSetup')().then(() => {
    const server = require('./src/app');
    server.listen(server.port, () => {
      console.log('Nginx Vhost Manager is running on port 8080');
      cb && cb();
    });
  }).catch(e => {
    console.error(e);
    process.exit();
  });
}
if (require.main === module) {
  start();
} else {
  module.exports = start;
}