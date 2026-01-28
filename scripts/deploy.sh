#!/bin/bash
set -e

echo "🚀 Deploying application with Docker Compose..."

# Stop and remove any running containers
docker-compose -f docker-compose.yml down || true

# Pull latest images from Docker Hub
docker-compose -f docker-compose.yml pull || true

# Start services in detached mode
docker-compose -f docker-compose.yml up -d --build

echo "✅ Application deployed successfully"
