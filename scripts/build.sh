#!/bin/bash
set -e

echo "🔨 Building Docker images for frontend and backend..."

# Build images using docker-compose (will use Dockerfile in each folder)
docker-compose -f docker-compose.yml build

echo "✅ Docker images built successfully"
