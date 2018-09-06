# nginx-vhost-manager
      Nginx Vhost Manager

## Requirements
- nodejs v8+
- nginx installed and using default vhost pattern (sites-available and sites-enabled)
- must run as root or sudo user

## Installation

Clone this repository
```bash
git clone https://github.com/uniibu/nginx-vhost-manager.git && cd nginx-vhost-manager
```

Install dependencies for both api and gui
```bash
bash ./install.sh
```

Create a .env file on api folder with following: (change each values to your own preference)
```bash
PORT=8081
TRUST_PROXY=true
NODE_ENV=production
PREFIX=api
PASSWORD=youradminpassword
```

Run with PM2 as sudo/root user
```bash
sudo pm2 start
```