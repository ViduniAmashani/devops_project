#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Use correct path to docker-compose.yml
docker compose -f "${WORKSPACE}/docker-compose.yml" down
docker compose -f "${WORKSPACE}/docker-compose.yml" up -d

echo "✅ Application deployed successfully"
