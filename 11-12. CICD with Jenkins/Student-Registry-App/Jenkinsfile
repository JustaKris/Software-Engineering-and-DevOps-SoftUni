pipeline {
    agent any

    stages {
        stage('NPM Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('NPM Audit') {
            steps {
                script {
                    def auditResult = bat(script: 'npm audit --json', returnStdout: true).trim()
                    if (!auditResult.contains("low") || !auditResult.contains("moderate") || !auditResult.contains("high")) {
                        echo "Vulnerabilities found. Fixing..."
                        bat 'npm audit fix'
                    } else {
                        echo "No vulnerabilities found."
                    }
                }
            }
        }
        stage('Run Integration tests') {
            steps {
                bat 'npm run test'
            }
        }
        stage('Deploy to prodution') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}