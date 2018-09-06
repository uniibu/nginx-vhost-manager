#!/usr/bin/env bash

NPM=$(which npm)

echo Yarn Installation
$NPM install yarn -g

echo PM2 Installation
$NPM install pm2 -g

echo Installing Dependencies
cd api && yarn
cd ../gui && yarn

echo Building gui
yarn build
cd ..

echo Installation Complete!




