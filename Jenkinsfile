pipeline {
    agent any

    environment {
        SPOTIFY_CLIENT_ID = credentials('SPOTIFY_CLIENT_ID')
        SPOTIFY_CLIENT_SECRET = credentials('SPOTIFY_CLIENT_SECRET')
        DB_ADMIN = credentials('DB_ADMIN')
        DB_HOST = credentials('DB_HOST')
        DB_PASSWORD = credentials('DB_PASSWORD')
        DJANGO_ENV = credentials('DJANGO_ENV')
        DOCKER_CREDENTIALS_ID = 'samipaandocker'
        DOCKER_IMAGE_TAG = "latest"
        DOCKERHUB_REPO = "samijuhani/music-recommender"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', credentialsId: 'samipaan', url: 'git@github.com:Sami-Juhani/music-recommendation-system.git'
            }
        }

        stage('Setup environment') {
            steps {
                // Setup a Python virtual environment and install dependencies
                script {
                    if (isUnix()) {
                        sh '''
                        cd ${WORKSPACE}/backend
                        python3 -m venv venv
                        . venv/bin/activate
                        pip3 install -r requirements.txt
                        '''
                    } else {
                        bat '''
                        cd ${WORKSPACE}/backend
                        python3 -m venv venv
                        . venv/bin/activate
                        pip3 install -r requirements.txt
                        '''
                    }
                }
             }
        }           

    stage('Run tests') {
        steps {
            script {
                sh '''
                cd ${WORKSPACE}/backend
                . venv/bin/activate
                yes | coverage run manage.py test
                '''     
            }
        }
        post {
            success {
                sh '''
                cd ${WORKSPACE}/backend
                . venv/bin/activate
                coverage html
                '''
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: "${WORKSPACE}/backend/htmlcov",
                    reportFiles: "index.html",
                    reportName: "Coverage Report"
                    ])
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS') {
                        sh '''
                        cd ${WORKSPACE}/frontend
                        echo "REACT_APP_BASE_URL=https://apimusicrecommender.samipaan.com" > .env.production
                        CI=false npm install
                        CI=false npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy into AWS') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sh '''
                        aws s3 cp ${WORKSPACE}/frontend/build/ s3://samipaan.com/music-recommender --recursive
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh '''
                    docker stop -t 10 music-recommender-container || true 
                    docker rm music-recommender-container || true
                    docker run -d -p 4000:4000 --env-file /var/lib/jenkins/envs/.musicrecommender --name music-recommender-container ${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}
                    '''
                }
            }
        }
    }
}