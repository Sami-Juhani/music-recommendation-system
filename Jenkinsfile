pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', credentialsId: 'samipaan', url: 'git@github.com:Sami-Juhani/music-recommendation-system.git'
            }
        }

        stage('Setup environment') {
            steps {
                // Setup a Python virtual envirnment and install dependencies
                sh 'cd music-recommendation-system'
                sh 'cd backend'
                sh 'python3 -m venv venv'
                sh '. venv/bin/activate'
                sh 'pip3 install -r requirements.txt'
            }
        }

        stage('Run tests') {
            steps {
                // Run Django tests
                sh 'python3 manage.py test'
            }
        }
    }

    post {
        always {
            // Always run this block after the pipeline, even if the pipeline fails
            junit '**/test-results.xml'  // Publish the test results
        }
    }
}