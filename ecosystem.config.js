const path = require('path');
module.exports = {
  apps: [{
    name: 'API',
    exec_mode: 'cluster',
    cwd: path.resolve(__dirname, 'api'),
    script: 'index.js',
    env: {
      NODE_ENV: 'production'
    }
  }],
};