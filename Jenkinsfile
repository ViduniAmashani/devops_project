pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')  // Username with Password type
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
                // Make sure we are in the repo root
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
                    // Pass username and password correctly
                    sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/deploy.sh'
                    sh './scripts/deploy.sh'
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
