const url = require('url');
const { resolve } = require('path');

module.exports = function nuxtAxios (moduleOptions) {
  moduleOptions = Object.assign({}, this.options.axios, moduleOptions);
  const defaultHost = moduleOptions.host || 'localhost';
  const defaultScheme = moduleOptions.https ? 'https' : 'http';
  const axiosOpts = {
    baseURL: moduleOptions.baseURL || url.format({
      protocol: defaultScheme,
      hostname: defaultHost,
      port: moduleOptions.port,
      pathname: moduleOptions.prefix
    }),
    headers: moduleOptions.headers
  };
  if(moduleOptions.agent){
    axiosOpts.httpsAgent = moduleOptions.agent;
  }
  this.addPlugin({
    src: resolve(__dirname, 'axiosPlugin.template.js'),
    fileName: 'axios.js',
    options: axiosOpts
  });
};
