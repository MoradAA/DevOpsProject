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
            
            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], "morad.aouladabdenabi@student.ap.be"],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}            
        }
    }
}
