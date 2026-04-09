pipeline{
    agent any

    stages{
        stage('checkout code'){
            steps{
                git branch: 'main',
                credentialsId: 'GITHUB_LOGIN',
                url: 'https://github.com/franklyniyala/movie-client.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN' )]) {
                    sh'''
                    docker run --rm \
                    -e SONAR_TOKEN=$SONAR_TOKEN \
                    -v $(pwd):/usr/src \
                    sonarsource/sonar-scanner-cli \
                    -Dsonar.projectKey=frank-org_movie-client \
                    -Dsonar.organization=frank-org \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=https://sonarcloud.io \
                    '''
                }
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
                    
                }
            }
        }

            stage('Push to Docker Hub'){
                steps{
                    
                    sh 'docker push ekenefranklyn/movie-client:v1'
                }
            }

        stage('Deploy application'){
            steps{
                sh '''
                    docker stop movie-client || true
                    doker rm movie-client || true
                    docker run -d -p 5173:5173 --name movie-client ekenefranklyn/movie-client:v1
                '''
            }
        }
                
    }

    post{
        success{
            echo " ✅ Application image built succesfully"
            echo " ✅ Application image pushed succesfully"
            echo " ✅ Application deployed succesfully"
        }
        failure{
            echo " ❌ Pipeline failed"
        }
    }
}