pipeline {
    agent {
        label 'docker'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            docker {
	        label 'docker'
                image 'node:14.0.0-alpine3.11' 
                args '-p 3000:3000' 
            }
            steps {
                echo "Installing dependencies"
                sh 'npm install'
            }
        }
          stage('Build') {
            docker {
	        label 'docker'
                image 'node:14.0.0-alpine3.11' 
                args '-p 3000:3000' 
            }
            steps {
                echo "Building solution"
                sh 'npm build'
            }
        }
    }
}