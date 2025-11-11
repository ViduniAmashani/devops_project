pipeline {
    agent any

    environment {
        PROJECT_DIR = "/mnt/c/Users/Asus12/Desktop/Projects/Blood_Donation"
        DOCKER_HUB_USER = "viduni2023"       
        FRONTEND_IMAGE = "project-frontend"  
        BACKEND_IMAGE = "project-backend"    
        IMAGE_TAG = "latest"                
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📦 Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Build and Tag Images') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "⚙️ Building Docker images..."
                    sh 'docker compose build'

                    echo "🏷️ Tagging images for Docker Hub..."
                    sh """
                        docker tag ${FRONTEND_IMAGE}:latest ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                        docker tag ${BACKEND_IMAGE}:latest ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh """
                        echo "🔐 Logging into Docker Hub..."
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin

                        echo "📤 Pushing frontend image..."
                        docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                        echo "📤 Pushing backend image..."
                        docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}

                        docker logout
                    """
                }
            }
        }

        stage('Run Containers') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "🚀 Starting containers..."
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! Images pushed to Docker Hub and containers running.'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
