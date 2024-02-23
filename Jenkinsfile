pipeline {
    agent any

    environment {
        SPOTIFY_CLIENT_ID = credentials('SPOTIFY_CLIENT_ID')
        SPOTIFY_CLIENT_SECRET = credentials('SPOTIFY_CLIENT_SECRET')
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
                    sh '''
                    cd /var/lib/jenkins/workspace/MusicRecommendationSystem/backend
                    python3 -m venv venv
                    . venv/bin/activate
                    pip3 install -r requirements.txt
                    '''
                }
             }
        }           

        stage('Run tests') {
            steps {
                // Run Django tests with coverage
                script {
                    sh '''
                    cd /var/lib/jenkins/workspace/MusicRecommendationSystem/backend
                    . venv/bin/activate
                    yes | coverage run manage.py test
                    '''
                }
            }
        }
    }

    post {
        always {
            // Generate HTML coverage report
            script {
                sh '''
                cd /var/lib/jenkins/workspace/MusicRecommendationSystem/backend
                . venv/bin/activate
                coverage html
                '''
            }

            // Publish HTML coverage report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: '/var/lib/jenkins/workspace/MusicRecommendationSystem/backend/htmlcov',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            ])
        }
    }
}