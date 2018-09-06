const baseProtocol = process.env.SECURE ? 'http' : 'https';
module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  mode: 'spa',
  baseProtocol,
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
  css: [ 'codemirror/lib/codemirror.css', '~/assets/scss/style.scss' ],
  modules: [
    [ 'bootstrap-vue/nuxt', { css: false } ], '~/modules/axiosModule', '~/modules/loggerModule'
  ]
};