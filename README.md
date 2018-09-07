# nginx-vhost-manager
      Nginx Vhost Manager

## Requirements
- nodejs v8+
- PM2 Module (optional but recommended) `npm install pm2 -g`
- nginx installed and using default vhost pattern (sites-available and sites-enabled)
- must have root/sudo access

## Installation

Clone this repository
```bash
git clone https://github.com/uniibu/nginx-vhost-manager.git && cd nginx-vhost-manager
```

Install dependencies
```bash
yarn install # or npm install
```

Run setup script to fix permissions(only run this one time)
```bash
sudo bash ./setup.sh
```

Create a .env file with following: (change each values to your own preference)
```bash
PORT=8081
TRUST_PROXY=true
NODE_ENV=production
PREFIX=api
PASSWORD=youradminpassword
```

Build the gui files (onle done once)
```bash
yarn build
```

Run with PM2 
```bash
yarn start
```