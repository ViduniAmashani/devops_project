#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

echo "🔐 Logging in to Docker Hub..."
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

echo "📤 Pushing images to Docker Hub..."
docker push $DOCKER_USER/project-frontend:latest
docker push $DOCKER_USER/project-backend:latest

echo "✅ Images pushed successfully"
