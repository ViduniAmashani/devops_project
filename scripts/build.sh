#!/bin/bash
set -e

echo "🔨 Building Docker images..."

# Make sure we're in the repo root
cd "$(dirname "$0")/.."

docker compose build

echo "✅ Docker images built successfully"
