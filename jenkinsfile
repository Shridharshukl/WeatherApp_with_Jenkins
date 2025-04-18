pipeline {
    agent any

    environment {
        SONAR_HOME = tool 'Sonar'
        WEATHER_IMAGE = "shridhar71/weather:v1.${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Shridharshukl/WeatherApp.git', branch: 'main'
                echo "✅ Code Checkout Done"
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv("Sonar") {
                    sh "${SONAR_HOME}/bin/sonar-scanner -Dsonar.projectKey=weatherapp -Dsonar.sources=."
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    sh "docker build -t ${WEATHER_IMAGE} ."

                    def safeImageName = WEATHER_IMAGE.replaceAll('[:/]', '_')
                    sh "trivy image --format table -o trivy-${safeImageName}.txt ${WEATHER_IMAGE}"
                    sh "mkdir -p report && mv trivy-${safeImageName}.txt report/"

                    withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh "docker push ${WEATHER_IMAGE}"
                    }
                }
            }
        }

        stage('Update YAML and Push to GitHub') {
            environment {
                GIT_REPO_NAME = "WeatherApp"
                GIT_USER_NAME = "Shridharshukl"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh """
                        git config user.name "CI Jenkins"
                        git config user.email "jenkins@example.com"
                        git remote set-url origin https://${GIT_USER_NAME}:${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git

                        IMAGE_TAG="v1.${BUILD_NUMBER}"
                        OLD_TAG=\$(grep 'image:' deployment/deployment.yml | awk -F ':' '{print \$3}')
                        sed -i "s|\${OLD_TAG}|\${IMAGE_TAG}|g" deployment/deployment.yml

                        git add deployment/deployment.yml
                        git commit -m "Auto-update Docker image tag to \${IMAGE_TAG}" || echo "⚠️ No changes to commit"
                        git push origin main
                    """
                }
            }
        }

        stage('Complete') {
            steps {
                echo "✅ Pipeline Finished Successfully!"
            }
        }
    }
}
