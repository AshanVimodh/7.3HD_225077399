pipeline {
    agent any

    environment {
        MONGO_URI = credentials('mongo-uri')  // Jenkins secret for MongoDB connection
        //JWT_SECRET = credentials('jwt-secret')  // JWT secret
        NODE_ENV = 'production'
        CLIENT_ENV = "true"
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
                npm install
                cd projects/client && npm install
                cd ../server && npm install
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                export NODE_OPTIONS=--openssl-legacy-provider
                cd projects/client
                npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit '**/test-results/*.xml'  // Adjust if you have test reports
                }
            }
        }

        // stage('Code Quality') {
        //     steps {
        //         // Example using SonarQube scanner
        //         withSonarQubeEnv('SonarQubeServer') {
        //             sh "sonar-scanner -Dsonar.login=${SONAR_TOKEN}"
        //         }
        //     }
        // }

        stage('Security Scan') {
            steps {
                // Example: Run npm audit or any other security scanner
                sh 'npm audit --audit-level=high'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         // Example: SSH deploy or container deploy
        //         sshagent(['deploy-ssh-key']) {
        //             sh '''
        //             ssh user@your-server "cd /path/to/app && git pull && npm install && pm2 restart all"
        //             '''
        //         }
        //     }
        // }

        // stage('Release') {
        //     steps {
        //         Tag the git commit for release (optional)
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
        //         // Example: Trigger a monitoring API or send Slack notification
        //         sh 'curl -X POST https://monitoring-api.example.com/deployments -d "build=${env.BUILD_NUMBER}"'
        //     }
        // }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            // Add notifications here if you want (Slack, email, etc)
        }
        failure {
            echo 'Pipeline failed!'
            // Add failure notifications here
        }
    }
}
