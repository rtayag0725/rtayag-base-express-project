pipeline {
  agent any

  environment {
    DATABASE_URL = "postgresql://postgres:password@postgres:5432/bible"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint or Test') {
      steps {
        // Optional: run your tests
        sh 'npm run lint || true'
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build -t hello-world-node .'
      }
    }
  }
}
