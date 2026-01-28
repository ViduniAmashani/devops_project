#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."
docker compose -f "$PWD/docker-compose.yml" down
docker compose -f "$PWD/docker-compose.yml" up -d
echo "✅ Application deployed successfully"
