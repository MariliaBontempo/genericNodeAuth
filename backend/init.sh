#!/bin/sh

echo "Waiting for PostgreSQL to start..."
sleep 10

if [ ! -d "prisma/migrations" ]; then
  echo "Creating initial migration..."
  yarn prisma migrate dev --name init --create-only
fi

echo "Running migrations..."
yarn prisma migrate deploy

echo "Starting application..."
yarn dev