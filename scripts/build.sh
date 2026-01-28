#!/bin/bash
set -e

echo "🔨 Building Docker images for frontend and backend..."

# Build images using modern docker compose command (without hyphen)
docker compose -f ../docker-compose.yml build


echo "✅ Docker images built successfully"
// --- IGNORE