Here’s a **clean and professional README** for your `WeatherApp_with_Jenkins` repo, followed by a **GitHub description**:

---

# 🌦️ WeatherApp with Jenkins CI/CD

A Node.js-based Weather Application integrated with Jenkins to demonstrate a complete CI/CD pipeline, including static code analysis with SonarQube, container security scanning using Trivy, Docker image building and publishing, and automated deployment updates via Git.

---

## 📌 Table of Contents

* [📖 Overview](#-overview)
* [✨ Features](#-features)
* [🧰 Tech Stack](#-tech-stack)
* [🔧 Jenkins Pipeline](#-jenkins-pipeline)
* [🚀 Getting Started](#-getting-started)
* [📦 CI/CD Flow](#-cicd-flow)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## 📖 Overview

This project demonstrates how to automate a software delivery workflow using Jenkins. The weather app fetches real-time weather data and is built, tested, scanned, packaged, and deployed automatically through Jenkins using a robust pipeline.

---

## ✨ Features

* 🌤️ Weather search by city
* 📦 Docker-based deployment
* 🔍 Static code analysis with SonarQube
* 🔐 Container image scanning with Trivy
* 🛠️ CI/CD pipeline using Jenkins
* 🔄 Auto-updating Kubernetes YAML via GitOps

---

## 🧰 Tech Stack

| Component  | Tech/Tool                     |
| ---------- | ----------------------------- |
| Frontend   | React (Optional) or HTML/JS   |
| Backend    | Node.js                       |
| CI/CD      | Jenkins, SonarQube, Trivy     |
| Container  | Docker                        |
| SCM        | GitHub                        |
| Deployment | Kubernetes (YAML auto-update) |

---

## 🔧 Jenkins Pipeline

The Jenkins pipeline (`Jenkinsfile`) includes the following stages:

1. **Checkout**: Clone code from GitHub.
2. **SonarQube Scan**: Run static code analysis.
3. **Docker Build & Trivy Scan**:

   * Build Docker image.
   * Scan image for vulnerabilities using Trivy.
   * Push image to DockerHub.
4. **Update YAML & Git Push**:

   * Update deployment YAML with the new image tag.
   * Commit and push changes back to GitHub.
5. **Complete**: Print pipeline completion status.

> 🔐 Secrets like GitHub token and DockerHub credentials are managed via Jenkins Credentials.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* [Jenkins](https://www.jenkins.io/)
* [SonarQube](https://www.sonarsource.com/)
* [Trivy](https://aquasecurity.github.io/trivy/)
* GitHub Access Token
* DockerHub Credentials

### Run Locally

```bash
git clone https://github.com/Shridharshukl/WeatherApp_with_Jenkins.git
cd WeatherApp_with_Jenkins
npm install
echo "WEATHER_API_KEY=your_openweathermap_api_key" > .env
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 📦 CI/CD Flow

Here’s what happens when Jenkins runs:

1. Jenkins pulls the latest code from GitHub.
2. Runs SonarQube scanner to check code quality.
3. Builds Docker image and scans it with Trivy.
4. Pushes the image to DockerHub.
5. Updates the deployment YAML with the new tag.
6. Pushes changes back to GitHub (for ArgoCD/Kubernetes to deploy).

---

## 🤝 Contributing

Want to help improve this project?

```bash
# 1. Fork this repo
# 2. Create a branch
git checkout -b feature/your-feature
# 3. Make changes & commit
git commit -m "Add some feature"
# 4. Push and create a PR
git push origin feature/your-feature
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
