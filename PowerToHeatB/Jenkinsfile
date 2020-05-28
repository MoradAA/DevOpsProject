pipeline {
    agent any
    tools {nodejs "NodeJS"}

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
