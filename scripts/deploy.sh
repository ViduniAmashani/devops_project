#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Stop and remove existing containers, then start new ones
docker compose down
docker compose up -d

echo "✅ Application deployed successfully"
