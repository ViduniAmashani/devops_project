#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Go to project root
cd "$(dirname "$0")/.."

docker compose down
docker compose up -d

echo "✅ Application deployed successfully"
