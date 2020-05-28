pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                echo "Installing dependencies"
                sh 'npm install'
            }
        }
          stage('Build') {
            steps {
                echo "Building solution"
                sh 'npm build'
            }
        }
    }