#!/bin/bash
set -e

IMAGE_NAME=my-app
IMAGE_TAG=latest
CONTAINER_NAME=my-app-container

echo "🚀 Deploying container..."

# Stop old container if exists
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Run new container
docker run -d \
  --name $CONTAINER_NAME \
  -p 80:80 \
  $IMAGE_NAME:$IMAGE_TAG

echo "✅ Application deployed successfully"
