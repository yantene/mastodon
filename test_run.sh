#!/bin/bash

bundle install
yarn install

docker stop postgres redis
docker run -d -p 5432:5432 --rm --name postgres postgres:alpine
docker run -d -p 6379:6379 --rm --name redis redis:latest

rake db:create
rake db:schema:load

foreman start
