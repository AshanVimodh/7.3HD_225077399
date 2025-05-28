pipeline {
    agent any

    environment {
        MONGO_URI = credentials('mongo-uri')
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
                    npm ci --include=dev --legacy-peer-deps
                    cd projects/client && npm ci --include=dev --legacy-peer-deps
                    cd ../server && npm ci --include=dev --legacy-peer-deps
                '''
            }
        }

        stage('Build') {
            steps {
                dir('projects/client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('projects/client') {
                    sh '''
                        npm test
                    '''
                }
                dir('projects/server') {
                    sh '''
                        npm test
                    '''
                }
            }
            post {
                always {
                    script {
                        def reportExists = fileExists '**/junit.xml'
                        if (reportExists) {
                            junit '**/junit.xml'
                        } else {
                            echo "No test results found to publish."
                        }
                    }
                }
            }
        }

        stage('Code Quality - SonarQube') {
            steps {
                withSonarQubeEnv('SonarQube 01') {
                    tool name: 'SonarScanner CLI'
                    sh "${tool 'SonarScanner CLI'}/bin/sonar-scanner"
                }
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy stage.'
            }
        }

        stage('Release') {
            steps {
                echo 'Release stage.'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring stage.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
