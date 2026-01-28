#!/bin/bash
set -e

# Use workspace path
DOCKER_COMPOSE_FILE="${WORKSPACE}/docker-compose.yml"

echo "🔨 Building Docker images..."
docker compose -f "$DOCKER_COMPOSE_FILE" build
echo "✅ Docker images built successfully"
