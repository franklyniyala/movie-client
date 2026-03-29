pipeline{
    agent any

    stages{
        stage('checkout code'){
            steps{
                git branch: 'main',
                credentialsId: 'GITHUB_CRED',
                url: 'https://github.com/franklyniyala/movie-client'
            }
        }

        stage('build docker image'){
            steps{
                sh 'docker build -t ekenefranklyn/movie-client:v1 .'
            }
        }

        stage('Login to docker hub'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKER_LOGIN',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]){
                        echo '$PASSWORD | docker login -u $USERNAME --password-stdin'
                        sh 'docker push ekenefranklyn/movie-client:v1'
                    
                }
            }
        }

        stage('Deploy application'){
            steps{
                sh '''
                    docker stop movie-client || true
                    doker rm movie-client || true
                    docker run -d -p 2400:80 --name movie-client ekenefranklyn/movie-client:v1
                '''
            }
        }
                
    }

    post{
        success{
            echo " ✅ React image built and pushed succesfully"
        }
        failure{
            echo " ❌ Pipeline failed"
        }
    }
}