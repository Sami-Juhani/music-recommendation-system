pipeline {
    agent any

    environment {
        SPOTIFY_CLIENT_ID = credentials('SPOTIFY_CLIENT_ID')
        SPOTIFY_CLIENT_SECRET = credentials('SPOTIFY_CLIENT_SECRET')
        DB_ADMIN = credentials('DB_ADMIN')
        DB_HOST = credentials('DB_HOST')
        DB_PASSWORD = credentials('DB_PASSWORD')
        DJANGO_ENV = credentials('DJANGO_ENV')
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
                // Run Django tests with coverage
                script {
                    if (isUnix()) {
                        sh '''
                        cd ${WORKSPACE}/backend
                        . venv/bin/activate
                        yes | coverage run manage.py test
                        '''
                    } else {
                        bat '''
                        cd ${WORKSPACE}/backend
                        . venv/bin/activate
                        yes | coverage run manage.py test
                        '''
                    }
                }
            }
        }

        stage('Build React App and deploy into AWS S3 bucket') {
            steps {
                script {
                    sh '''
                    cd ${WORKSPACE}/frontend
                    npm install
                    npm run build
                    aws s3 cp build/ s3://samipaan.com/music-recommender --recursive
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                script {
                    if (isUnix()) {
                        sh '''
                        cd ${WORKSPACE}
                        cp /var/lib/jenkins/envs/.musicrecommender backend/.env
                        cp -r /var/lib/jenkins/data/. backend/recommendations/data
                        docker build -t music-recommender .
                        '''
                    } else {
                        bat '''
                        cd ${WORKSPACE}
                        cp /var/lib/jenkins/envs/.musicrecommender backend/.env
                        cp -r /var/lib/jenkins/data/. backend/recommendations/data
                        docker build -t music-recommender .
                        '''
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run Docker container
                script {
                    if (isUnix()) {
                        sh '''
                        docker stop -t 10 music-recommender-container || true 
                        docker rm music-recommender-container || true
                        docker run -d -p 4000:4000 --env-file /var/lib/jenkins/envs/.musicrecommender --name music-recommender-container music-recommender
                        '''
                    } else {
                        bat '''
                        docker stop -t 10 music-recommender-container || true 
                        docker rm music-recommender-container || true
                        docker run -d -p 4000:4000 --env-file /var/lib/jenkins/envs/.musicrecommender --name music-recommender-container music-recommender
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            // Generate HTML coverage report
            script {
                if (isUnix()) {
                    sh '''
                    cd ${WORKSPACE}/backend
                    . venv/bin/activate
                    coverage html
                    '''
                } else {
                    bat '''
                    cd ${WORKSPACE}/backend
                    . venv/bin/activate
                    coverage html
                    '''
                }
            }

            // Publish HTML coverage report
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