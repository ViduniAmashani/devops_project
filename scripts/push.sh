#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

# Your Docker Hub image names
FRONTEND_IMAGE=viduni2023/project-frontend
BACKEND_IMAGE=viduni2023/project-backend
IMAGE_TAG=latest

echo "🔐 Logging in to Docker Hub..."
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

echo "🏷️ Tagging frontend and backend images..."
docker tag frontend_c:latest $FRONTEND_IMAGE:$IMAGE_TAG
docker tag backend_c:latest $BACKEND_IMAGE:$IMAGE_TAG

echo "📤 Pushing images to Docker Hub..."
docker push $FRONTEND_IMAGE:$IMAGE_TAG
docker push $BACKEND_IMAGE:$IMAGE_TAG

echo "✅ Images pushed successfully"
