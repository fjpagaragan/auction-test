#!/bin/bash

# We need to wait for the postgres container to accept connections before we run migrations
HOST=$1
PORT=$2
echo "waiting for postgres to accept connections at $HOST:$PORT"
timeout 22 sh -c 'until printf ". " 2>>/dev/null >>/dev/tcp/$0/$1; do sleep 1; done' "$HOST" "$PORT"

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
