process.env.NODE_ENV = process.env.NODE_ENV || 'production';
require('dotenv').config();
delete process.env.PASSWORD;
delete process.env.SECRET;
const conf = require('./config');
/* Check other configs on the config folder */
module.exports = {
  mode: conf.mode,
  head: conf.head,
  css: conf.css,
  modules: conf.modules,
  plugins: [{ src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }],
  loading: { color: '#3B8070', height: '5px' },
  dev: conf.isDev,
  build: {
    extractCSS: process.env.EXTRACT == 'true',
    filenames: conf.isDev ? {} : {
      css: '[contenthash].min.css',
      manifest: '[hash].min.js',
      vendor: '[chunkhash].min.js',
      app: '[chunkhash].min.js',
      chunk: '[chunkhash].min.js'
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (!isDev) {
        config.devtool = false;
        config.performance.maxEntrypointSize = 1510000;
        config.performance.maxAssetSize = 650000;
        config.module.rules = config.module.rules.map(
          (o) => {
            if (o.test.toString() === '/\\.(png|jpe?g|gif|svg)$/') {
              o.test = /\.(gif|svg)$/;
            }
            return o;
          }
        );
        config.module.rules.push({
          test: /\.(jpe?g|png)$/i,
          use: [{
            loader: 'responsive-loader',
            options: {
              name: 'img/[name].[hash:7]-[width].[ext]',
              adapter: require('responsive-loader/sharp'),
              placeholder: false,
              quality: 60
            }
          }]
        });
      }
    }
  },
  logger: {
    enabled: conf.isDev,
    colors: conf.isDev
  },
  axios: {
    host: conf.ipHost,
    prefix: conf.prefix,
    headers: [{ scope: 'post', name: 'Content-Type', value: 'application/json' }]
  },
};