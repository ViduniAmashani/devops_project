pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-dockerhub-username/your-image-name:latest'  // your existing image
        CONTAINER_NAME = 'blood_donation_app'
        PORT = '5000' // change if your app uses another port
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull latest code from your Git repository
                git branch: 'main', url: 'https://github.com/yourusername/your-repo.git'
            }
        }

        stage('Pull Existing Docker Image') {
            steps {
                echo 'Pulling existing Docker image from Docker Hub...'
                sh 'docker pull $DOCKER_IMAGE'
            }
        }

        stage('Stop Old Container (if running)') {
            steps {
                script {
                    sh '''
                    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
                        echo "Stopping and removing old container..."
                        docker stop $CONTAINER_NAME
                        docker rm $CONTAINER_NAME
                    fi
                    '''
                }
            }
        }

        stage('Run Container from Pulled Image') {
            steps {
                echo 'Running container from existing Docker image...'
                sh 'docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $DOCKER_IMAGE'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed. Check logs in Jenkins console.'
        }
    }
}
