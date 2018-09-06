const { resolve } = require('path');

module.exports = function nuxtLogger (moduleOptions) {
  const defaults = {
    enabled: true,
    colors: true,
    levels: [
      'log', 'info', 'warn', 'error'
    ]
  };
  moduleOptions = Object.assign(defaults, this.options.logger, moduleOptions);

  this.addPlugin({
    src: resolve(__dirname, 'loggerPlugin.template.js'),
    fileName: 'logger.js',
    options: moduleOptions
  });
};
