# 🚀 Complete DevOps Setup Guide

## ✅ PHASE 1 — Application (DONE)
Your Weather Dashboard is ready!

---

## 📂 PHASE 2 — Git & GitHub

### Step 1: Initialize Git
```bash
cd DevopsProject
git init
git add .
git commit -m "Initial commit: Weather Dashboard"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com
2. Click "New Repository"
3. Name: `weather-dashboard`
4. Keep it Public
5. Don't initialize with README (we already have one)
6. Click "Create Repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git branch -M main
git push -u origin main
```

---

## 🐳 PHASE 3 — Docker

### Step 1: Install Docker Desktop
- Download: https://www.docker.com/products/docker-desktop
- Install and restart your PC
- Open Docker Desktop

### Step 2: Build Docker Image
```bash
cd DevopsProject
docker build -t weather-dashboard .
```

### Step 3: Run Container
```bash
docker run -d -p 8080:8080 --name weather-app weather-dashboard
```

### Step 4: Test
Open browser: http://localhost:8080

### Useful Docker Commands
```bash
# See running containers
docker ps

# Stop container
docker stop weather-app

# Remove container
docker rm weather-app

# See images
docker images

# Remove image
docker rmi weather-dashboard
```

---

## 🌐 PHASE 4 — DockerHub

### Step 1: Create Account
- Go to https://hub.docker.com
- Sign up (free)
- Remember your username

### Step 2: Login
```bash
docker login
# Enter username and password
```

### Step 3: Tag Image
```bash
docker tag weather-dashboard YOUR_DOCKERHUB_USERNAME/weather-dashboard:latest
```

### Step 4: Push to DockerHub
```bash
docker push YOUR_DOCKERHUB_USERNAME/weather-dashboard:latest
```

### Step 5: Verify
- Go to https://hub.docker.com
- Check your repositories
- Your image should be there!

---

## 🔧 PHASE 5 — Jenkins Setup

### Step 1: Install Jenkins

**Option A: Using Docker (Recommended)**
```bash
docker run -d -p 8081:8080 -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  --name jenkins ^
  jenkins/jenkins:lts
```

**Option B: Direct Installation**
- Download: https://www.jenkins.io/download/
- Install Jenkins
- Start Jenkins service

### Step 2: Initial Setup
1. Open: http://localhost:8081
2. Get initial password:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```
3. Install suggested plugins
4. Create admin user

### Step 3: Install Required Plugins
1. Go to: Manage Jenkins → Plugins
2. Install:
   - Docker Pipeline
   - GitHub Integration
   - Credentials Binding

### Step 4: Add DockerHub Credentials
1. Manage Jenkins → Credentials
2. Add Credentials:
   - Kind: Username with password
   - ID: `dockerhub-credentials`
   - Username: Your DockerHub username
   - Password: Your DockerHub password

### Step 5: Create Pipeline Job
1. New Item → Pipeline
2. Name: `weather-dashboard-pipeline`
3. Pipeline Definition: Pipeline script from SCM
4. SCM: Git
5. Repository URL: Your GitHub repo URL
6. Branch: `*/main`
7. Script Path: `Jenkinsfile`
8. Save

### Step 6: Update Jenkinsfile
Edit `Jenkinsfile` and replace:
```
DOCKER_IMAGE = "YOUR_DOCKERHUB_USERNAME/weather-dashboard"
```

### Step 7: Run Pipeline
1. Click "Build Now"
2. Watch the pipeline execute
3. Check console output

---

## 🎯 PHASE 6 — Continuous Deployment

### Option A: Local Auto-Deploy (Already in Jenkinsfile)
The Jenkinsfile already includes deployment:
- Stops old container
- Runs new container on port 8080
- Auto-updates on every push

### Option B: Deploy to Cloud (Free Options)

**1. Railway.app**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**2. Render.com**
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Select Docker
5. Deploy

**3. Fly.io**
```bash
# Install Fly CLI
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Login
fly auth login

# Deploy
fly launch
```

---

## 🔄 Complete CI/CD Workflow

1. **Make changes** to your code
2. **Commit and push** to GitHub:
```bash
git add .
git commit -m "Updated feature"
git push origin main
```
3. **Jenkins automatically**:
   - Detects the push
   - Pulls latest code
   - Builds Docker image
   - Pushes to DockerHub
   - Deploys new container
4. **Your app updates** automatically! 🎉

---

## 🎓 Testing the Full Pipeline

### Test 1: Change UI
1. Edit `static/style.css` - change a color
2. Commit and push
3. Watch Jenkins build
4. Refresh http://localhost:8080
5. See your changes live!

### Test 2: Add Feature
1. Edit `static/script.js` - add console.log
2. Commit and push
3. Jenkins rebuilds
4. Check browser console

---

## 🐛 Troubleshooting

### Docker not starting?
```bash
# Restart Docker Desktop
# Or restart Docker service
```

### Jenkins can't access Docker?
```bash
# Add Jenkins user to docker group (Linux/Mac)
sudo usermod -aG docker jenkins

# On Windows, ensure Docker Desktop is running
```

### Port already in use?
```bash
# Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Pipeline failing?
- Check Jenkins console output
- Verify DockerHub credentials
- Ensure Docker is running
- Check Jenkinsfile syntax

---

## 📊 Project Checklist

- [ ] Phase 1: Application working locally
- [ ] Phase 2: Code on GitHub
- [ ] Phase 3: Docker image builds
- [ ] Phase 3: Container runs successfully
- [ ] Phase 4: DockerHub account created
- [ ] Phase 4: Image pushed to DockerHub
- [ ] Phase 5: Jenkins installed
- [ ] Phase 5: Pipeline created
- [ ] Phase 5: First successful build
- [ ] Phase 6: Auto-deployment working
- [ ] Phase 6: Full CI/CD tested

---

## 🎉 Congratulations!

You've built a complete DevOps project with:
✅ Modern Web Application
✅ Version Control (Git/GitHub)
✅ Containerization (Docker)
✅ Container Registry (DockerHub)
✅ CI/CD Pipeline (Jenkins)
✅ Automated Deployment

This is production-ready DevOps! 🚀
