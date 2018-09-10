function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '0.0.0.0';
}
module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  mode: 'spa',
  ipHost: process.env.APIHOST || `http://${getIPAddress()}:${process.env.PORT || 8080}`,
  prefix: process.env.PREFIX || 'api',
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Nginx-vhost',
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Nginx vhost manager' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['codemirror/lib/codemirror.css', '~/assets/scss/style.scss'],
  modules: [
    ['bootstrap-vue/nuxt', { css: false }]
  ]
};