#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

echo "🔐 Logging in to Docker Hub..."
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

echo "🏷️ Tagging frontend and backend images..."
# Use your actual local image names here
docker tag project-frontend:latest $DOCKER_USER/project-frontend:latest
docker tag project-backend:latest $DOCKER_USER/project-backend:latest

echo "📤 Pushing images to Docker Hub..."
docker push $DOCKER_USER/project-frontend:latest
docker push $DOCKER_USER/project-backend:latest

echo "✅ Images pushed successfully"
