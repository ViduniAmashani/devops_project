#!/bin/bash
set -e

echo "🔨 Building Docker images for frontend and backend..."
docker compose -f "$PWD/docker-compose.yml" build
echo "✅ Docker images built successfully"
