pipeline{
    agent any

    stages{
        stage('checkout code'){
            steps{
                git branch: 'main', url: 'https://github.com/franklyniyala/movie-client'
            }
        }

        stage('build docker image'){
            steps{
                sh 'docker build -t ekenefranklyn/movie-app:v1 .'
            }
        }

        stage('Login to docker hub'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKER_LOGIN',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    echo '$PASSWORD | docker login -u $USERNAME --password-stdin'
                    
                }
            }

        }

        stage('push to docker hub'){
            steps{
                sh 'docker push ekenefranklyn/movie-app:v1'
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