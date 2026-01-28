#!/bin/bash
set -e

DOCKER_COMPOSE_FILE="${WORKSPACE}/docker-compose.yml"

echo "🔨 Building Docker images for frontend and backend..."

# Build images using docker-compose (will use Dockerfile in each folder)
docker compose -f "$DOCKER_COMPOSE_FILE" build

echo "✅ Docker images built successfully"
