const nginx = require('./nginx');
const guiVhost = 'nvmanager';
const path = require('path');
const distDir = path.resolve(__dirname, '../../dist');
const guiConfig = `server {
        listen 8080;
	      listen [::]:8080;

        root ${distDir};
        port_in_redirect off;
        index index.html;
        
        charset utf-8;
        autoindex off;
        location ~* \\.(css|js|gif|jpeg|jpg|png|otf|eot|svg|ttf|woff|woff2)$ {
            expires 365d;
            add_header Cache-Control "public, must-revalidate, proxy-revalidate";
            try_files $uri =404;
        }

        location / {
          try_files $uri $uri/ =404;
        }
}`;
module.exports = async () => {
  if (!nginx.statusNginx()) {
    const n = await nginx.startNginx();
    if (!n) throw new Error('Failed to start nginx');
    else console.log('Nginx started...');
  }
  if (nginx.configExist(guiVhost)) {
    return;
  }
  await nginx.newVhost(guiVhost, nginx.format(guiConfig));
  const checkConfig = await nginx.checkConfig(guiVhost);
  if (!checkConfig) {
    throw new Error('Syntax Error, Config not saved');
  }
  await nginx.restartNginx();
  return;
};