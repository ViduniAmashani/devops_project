#!/bin/bash
set -e

echo "🔨 Building Docker images for frontend and backend..."

# Build images using docker-compose from repo root
docker compose -f "${WORKSPACE}/docker-compose.yml" build

echo "✅ Docker images built successfully"
