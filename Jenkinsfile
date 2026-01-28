pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')   
        AWS_KEY     = credentials('aws-access-key')    
        AWS_SECRET  = credentials('aws-secret-key')
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Pull repo into Jenkins workspace
                git branch: 'main', url: 'https://github.com/ViduniAmashani/devops_project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/push.sh'
                    sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                script {
                    // Configure AWS CLI with credentials
                    sh """
                    aws configure set aws_access_key_id $AWS_KEY
                    aws configure set aws_secret_access_key $AWS_SECRET
                    aws configure set default.region us-east-1
                    """

                    // Example ECS deployment (update service)
                    sh """
                    aws ecs update-service \
                        --cluster my-ecs-cluster \
                        --service my-ecs-service \
                        --force-new-deployment
                    """
                }
            }
        }
    }

    post {
        success {
            echo "CI/CD pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check Jenkins console for details."
        }
    }
    
}