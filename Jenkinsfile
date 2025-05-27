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
                    npm ci --legacy-peer-deps
                    cd projects/client && npm ci --legacy-peer-deps
                    cd ../server && npm ci --legacy-peer-deps
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
                dir('projects/client') {
                    sh '''
                        npm ci --legacy-peer-deps
                        ls -l node_modules/jest-junit
                        npm test
                    '''
                }
                dir('projects/server') {
                    sh '''
                        npm ci --legacy-peer-deps
                        ls -l node_modules/jest-junit
                        npm test
                    '''
                }
            }
            post {
                always {
                    junit '**/junit.xml'
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
