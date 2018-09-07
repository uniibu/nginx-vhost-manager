#!/usr/bin/env bash

OUSER=${SUDO_USER:-$USER}
NGINXDIR=$HOME/.nginx
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root or sudo" 1>&2
   exit 1
fi
service nginx stop
groupadd nginxusers
usermod -aG nginxusers $OUSER
chown :nginxusers /etc/nginx/nginx.conf
chmod g+w /etc/nginx/nginx.conf
chown -R :nginxusers /etc/nginx/sites-available
chmod -R g+w /etc/nginx/sites-available
chown -R :nginxusers /etc/nginx/sites-enabled
chmod -R g+w /etc/nginx/sites-enabled

service nginx start

echo Setup Complete.


