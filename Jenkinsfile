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
                dir('terraform') {   // <-- run in terraform folder
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

      stage('Deploy Containers') {
    steps {
            withCredentials([file(credentialsId: 'VSERVER_KEY', variable: 'VSERVER_KEY_PATH')]) {
        sh """
            ansible-playbook \
            -i ansible/inventory.ini \
            ansible/deploy.yml \
            --private-key $VSERVER_KEY_PATH \
            -u ubuntu \
            -e 'ansible_python_interpreter=/usr/bin/python3'
        """
    }

    }
}


    }

    post {
        success {
            echo "✅ Terraform + Jenkins CI/CD Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check console logs."
        }
    }
}
