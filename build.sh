#!/bin/bash

cd ./server
yarn build

cd ../client
rm -rf ./public/avatars/*
yarn build

cd ..

rm -rf ./dist
mkdir dist
mkdir dist/static

cp -r ./server/dist/* ./dist
rm -rf ./server/dist

cp -r ./client/dist/* ./dist/static
rm -rf ./client/dist