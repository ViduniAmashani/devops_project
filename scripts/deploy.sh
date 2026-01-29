#!/bin/bash
set -e

echo "🚀 Deploying containers using Docker Compose..."

# Go to project root
cd "$(dirname "$0")/.."

# Stop and remove any old containers that might conflict
echo "🧹 Cleaning up old containers..."
docker rm -f backend_c frontend_c blood_donation_db || true

# Optional: remove old network if needed
docker network prune -f || true

# Deploy fresh containers
docker compose up -d --build

echo "✅ Application deployed successfully"
