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
                sh 'npm run build'
            }
        }
    }
    
    post {
        always {
            echo 'Sending e-mail'
            
            mail to: 'morad.aouladabdenabi@student.ap.be',
                subject: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                body: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
        }
    }
}
