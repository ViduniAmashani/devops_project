#!/bin/bash
set -e

DOCKER_COMPOSE_FILE="${WORKSPACE}/docker-compose.yml"

echo "🚀 Deploying containers..."
docker compose -f "$DOCKER_COMPOSE_FILE" down
docker compose -f "$DOCKER_COMPOSE_FILE" up -d
echo "✅ Application deployed successfully"
