#!/bin/bash
set -e

echo "🔨 Building Docker image..."

IMAGE_NAME=my-app
IMAGE_TAG=latest

docker build -t $IMAGE_NAME:$IMAGE_TAG .

echo "✅ Docker image built successfully"
