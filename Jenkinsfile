pipeline {
    agent {
        docker {
            image 'node:14.0.0-alpine3.11' 
            args '-p 3000:3000' 
        }
    }

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
}