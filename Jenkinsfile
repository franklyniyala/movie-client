pipeline{
    agent any
    environment{
        IMAGE_NAME='movie-app:v1'
        IMAGE_TAG='v1'
        DOCKER_CREDENTIAL_ID='dockerlogin'

    }

    stages{
        stage('checkout code'){
            steps{
                git branch: 'main', url: 'https://github.com/franklyniyala/movie-client'
            }
        }

        stage('build docker image'){
            steps{
                sh 'docker build -t $IMAGE_NAME:IMAGE_TAG .'
            }
        }

        stage('Login to docker hub'){
            steps{
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIAL_ID}")])
            }

        }

        stage('push to docker hub'){
            steps{
                sh 'docker push $IMAGE_NAME:IMAGE_TAG'
            }
        }
    }

    post{
        success{
            echo "React image built and pushed succesfully"
        }
        failure{
            echo "Pipeline failed"
        }
    }
}