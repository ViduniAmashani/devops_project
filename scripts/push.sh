#!/bin/bash
set -e

DOCKER_USER=$1
DOCKER_PASS=$2

IMAGE_NAME=my-app
IMAGE_TAG=latest

echo "🔐 Logging in to Docker Hub..."
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

echo "🏷️ Tagging image..."
docker tag $IMAGE_NAME:$IMAGE_TAG $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG

echo "📤 Pushing image to Docker Hub..."
docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG

echo "✅ Image pushed successfully"
