module.exports = {
  apps: [{
    name: 'API',
    exec_mode: 'cluster',
    script: './api/index.js',
    env: {
      NODE_ENV: 'production'
    }
  }],
};