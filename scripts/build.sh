#!/bin/bash
set -e

echo "🔨 Building Docker images for frontend and backend..."

# Use the absolute path to docker-compose.yml
docker compose -f "$WORKSPACE/docker-compose.yml" build

echo "✅ Docker images built successfully"
