#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Stop existing containers and start new ones
docker compose -f "$WORKSPACE/docker-compose.yml" down
docker compose -f "$WORKSPACE/docker-compose.yml" up -d

echo "✅ Application deployed successfully"
