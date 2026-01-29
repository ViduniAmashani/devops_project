pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        AWS_DEFAULT_REGION    = "ap-south-1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ViduniAmashani/devops_project.git'
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir('terraform') {
                    sh 'terraform validate'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'chmod +x scripts/build.sh'
                sh './scripts/build.sh'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'chmod +x scripts/push.sh'
                sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
            }
        }

        // Ansible deployment stage
        stage('Ansible Deploy') {
            steps {
                
                sh 'sudo apt-get update && sudo apt-get install -y ansible'

                
                dir("${WORKSPACE}") {
                    sh """
                    ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
                    --private-key $ANSIBLE_KEY -u ubuntu -v
                    """
                }
            }
        }

    } // end stages

    post {
        success {
            echo "✅ Terraform + Jenkins CI/CD Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check console logs."
        }
    }
} // end pipeline
