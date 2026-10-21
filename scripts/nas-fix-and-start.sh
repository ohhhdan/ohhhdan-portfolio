#!/usr/bin/env bash
set -euo pipefail

cd /volume1/docker/ohhhdan-portfolio

COMPOSE="docker compose -f docker/synology/docker-compose.yml"

if [ -d data ] && compgen -G 'data/*.json' > /dev/null; then
  echo "Copying data/*.json -> docker/synology/data/"
  cp data/*.json docker/synology/data/
fi

echo "Fixing data directory ownership (1001:1001)..."
chown -R 1001:1001 docker/synology/data

echo "Stopping containers..."
$COMPOSE down

echo "Rebuilding portfolio image (no cache)..."
$COMPOSE build --no-cache portfolio

echo "Starting containers..."
$COMPOSE up -d

echo "Waiting 5s for startup..."
sleep 5

echo "Recent container logs:"
$COMPOSE logs --tail=50 portfolio

echo ""
echo "HTTP check:"
curl -I http://127.0.0.1:3000
