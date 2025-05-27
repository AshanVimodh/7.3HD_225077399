pipeline {
    agent any

    environment {
        MONGO_URI = credentials('mongo-uri')  // Jenkins secret for MongoDB connection
        // JWT_SECRET = credentials('jwt-secret')  // Uncomment if needed
        NODE_ENV = 'production'
        CLIENT_ENV = "true"
        NODE_OPTIONS = '--openssl-legacy-provider'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                    cd projects/client && npm ci
                    cd ../server && npm ci
                '''
            }
        }

        stage('Build') {
            steps {
                dir('projects/client') {
                    sh 'npm ci --legacy-peer-deps'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit '**/test-results/*.xml'  // Adjust to your test report path
                }
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        // Uncomment and configure when ready
        // stage('Deploy') {
        //     steps {
        //         sshagent(['deploy-ssh-key']) {
        //             sh '''
        //             ssh user@your-server "cd /path/to/app && git pull && npm ci && pm2 restart all"
        //             '''
        //         }
        //     }
        // }

        // stage('Release') {
        //     steps {
        //         sh '''
        //         git config user.name "Jenkins"
        //         git config user.email "jenkins@yourdomain.com"
        //         git tag -a "release-${env.BUILD_NUMBER}" -m "Release build ${env.BUILD_NUMBER}"
        //         git push origin --tags
        //         '''
        //     }
        // }

        // stage('Monitoring') {
        //     steps {
        //         sh 'curl -X POST https://monitoring-api.example.com/deployments -d "build=${env.BUILD_NUMBER}"'
        //     }
        // }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            // Add Slack/Discord notifications here if needed
        }
        failure {
            echo 'Pipeline failed!'
            // Add failure notifications here
        }
    }
}
