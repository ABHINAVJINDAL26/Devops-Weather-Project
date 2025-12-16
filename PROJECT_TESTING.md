# 🧪 Complete Project Testing Guide

## 📋 Testing Checklist

### ✅ Phase 1: Code Files Check

### ✅ Phase 2: Local Python Testing

### ✅ Phase 3: Docker Testing

### ✅ Phase 4: Jenkins Testing

### ✅ Phase 5: CI/CD Pipeline Testing

### ✅ Phase 6: End-to-End Testing

---

## 🔍 Phase 1: Code Files Verification

### Step 1.1: Check All Files Exist

```bash
cd c:\Users\jabhi\OneDrive\Desktop\DevopsProject
dir
```

**Expected Output:**

- ✅ app/ folder
- ✅ static/ folder
- ✅ Dockerfile
- ✅ Jenkinsfile
- ✅ requirements.txt
- ✅ README.md

### Step 1.2: Verify Python Code

```bash
type app\main.py
```

**Check karo:**

- ✅ FastAPI import hai
- ✅ StaticFiles mount hai
- ✅ Root endpoint hai
- ✅ Port 8080 pe run hota hai

### Step 1.3: Verify Frontend Files

```bash
type static\index.html
type static\style.css
type static\script.js
```

**Check karo:**

- ✅ HTML structure complete
- ✅ CSS styling present
- ✅ JavaScript weather API calls

---

## 🐍 Phase 2: Local Python Testing

### Step 2.1: Install Dependencies

```bash
pip install -r requirements.txt
```

**Expected:** FastAPI, uvicorn install ho jaye

### Step 2.2: Run Application

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**

```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Step 2.3: Test in Browser

1. Open: **http://localhost:8000**
2. Check karo:
   - ✅ Page load hota hai
   - ✅ UI dikhta hai (glassmorphism design)
   - ✅ Search box visible hai

### Step 2.4: Test Weather Functionality

1. **GPS Location Test:**

   - "Use My Location" button click karo
   - Browser location permission allow karo
   - Weather data dikhna chahiye

2. **City Search Test:**

   - Search box mein "Delhi" type karo
   - Enter press karo
   - Delhi ka weather dikhna chahiye

3. **Check Console:**
   - F12 press karo (Developer Tools)
   - Console tab mein errors nahi hone chahiye

### Step 2.5: Stop Application

```bash
Ctrl + C
```

**Result:** ✅ Local Python app working!

---

## 🐳 Phase 3: Docker Testing

### Step 3.1: Check Docker Running

```bash
docker --version
docker ps
```

**Expected:** Docker version dikhna chahiye

### Step 3.2: Build Docker Image

```bash
docker build -t weather-dashboard-test .
```

**Expected Output:**

```
[+] Building 45.2s (10/10) FINISHED
Successfully built abc123def456
Successfully tagged weather-dashboard-test:latest
```

**Check karo:**

- ✅ No errors during build
- ✅ All steps complete
- ✅ Image created successfully

### Step 3.3: Verify Image Created

```bash
docker images | findstr weather
```

**Expected:** weather-dashboard-test image dikhna chahiye

### Step 3.4: Run Docker Container

```bash
docker run -d -p 8080:8080 --name weather-test weather-dashboard-test
```

**Expected:** Container ID return hoga

### Step 3.5: Check Container Running

```bash
docker ps | findstr weather-test
```

**Expected:** Container "Up" status mein hona chahiye

### Step 3.6: Check Container Logs

```bash
docker logs weather-test
```

**Expected Output:**

```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8080
```

### Step 3.7: Test Application

1. Open: **http://localhost:8080**
2. Same tests repeat karo (GPS, City Search)
3. Check functionality working hai

### Step 3.8: Cleanup

```bash
docker stop weather-test
docker rm weather-test
docker rmi weather-dashboard-test
```

**Result:** ✅ Docker containerization working!

---

## 🔧 Phase 4: Jenkins Testing

### Step 4.1: Check Jenkins Running

```bash
docker ps | findstr jenkins
```

**Expected:** Jenkins container running hona chahiye

### Step 4.2: Access Jenkins

1. Open: **http://localhost:8081**
2. Login karo (admin credentials se)

**Check karo:**

- ✅ Dashboard loads properly
- ✅ No errors on page

### Step 4.3: Verify Plugins

1. **Manage Jenkins** → **Plugins**
2. **Installed plugins** tab check karo:
   - ✅ Docker Pipeline
   - ✅ Git plugin
   - ✅ Pipeline plugin

### Step 4.4: Verify Docker Access

1. **Manage Jenkins** → **System**
2. Scroll down, check Docker available hai

**Alternative - Command Line:**

```bash
docker exec jenkins docker ps
```

**Expected:** Docker commands work karte hain

### Step 4.5: Check Credentials

1. **Manage Jenkins** → **Credentials**
2. **(global)** domain click karo
3. Check karo:
   - ✅ `dockerhub-credentials` exist karta hai
   - ✅ Username: jabhii26

**Result:** ✅ Jenkins setup complete!

---

## 🚀 Phase 5: CI/CD Pipeline Testing

### Step 5.1: Check Pipeline Job

1. Jenkins Dashboard pe jao
2. `weather-dashboard-pipeline` job dikhna chahiye
3. Job click karke open karo

### Step 5.2: Verify Pipeline Configuration

1. Job page pe **Configure** click karo
2. Check karo:
   - ✅ SCM: Git
   - ✅ Repository URL correct hai
   - ✅ Branch: \*/main
   - ✅ Script Path: Jenkinsfile

### Step 5.3: Manual Build Test

1. Pipeline page pe **Build Now** click karo
2. Build history mein new build dikhega (#1, #2, etc.)
3. Build number click karo
4. **Console Output** click karo

**Expected Stages:**

```
✅ Stage: Checkout
✅ Stage: Build Docker Image
✅ Stage: Push to DockerHub
✅ Stage: Deploy
```

### Step 5.4: Monitor Build Progress

Console output mein dekho:

- ✅ Git clone successful
- ✅ Docker build successful
- ✅ Docker push successful
- ✅ Container deployed

**Expected Final Message:**

```
Finished: SUCCESS
```

### Step 5.5: Verify Build Artifacts

**Check Docker Image:**

```bash
docker images | findstr jabhii26/weather-dashboard
```

**Check Running Container:**

```bash
docker ps | findstr weather-app
```

### Step 5.6: Test Deployed App

1. Open: **http://localhost:8080**
2. Full functionality test karo
3. Weather data properly load ho raha hai

**Result:** ✅ CI/CD Pipeline working!

---

## 🌐 Phase 6: DockerHub Verification

### Step 6.1: Check DockerHub (Browser)

1. Open: **https://hub.docker.com**
2. Login: jabhii26
3. Go to: **https://hub.docker.com/r/jabhii26/weather-dashboard**

**Check karo:**

- ✅ Repository exists
- ✅ Latest tag visible hai
- ✅ Image size reasonable hai (~150-200MB)
- ✅ Last pushed time recent hai

### Step 6.2: Pull Image Test

```bash
# Remove local image
docker rmi jabhii26/weather-dashboard:latest

# Pull from DockerHub
docker pull jabhii26/weather-dashboard:latest
```

**Expected:** Image successfully download ho jaye

### Step 6.3: Run Pulled Image

```bash
docker run -d -p 9090:8080 --name weather-dockerhub jabhii26/weather-dashboard:latest
```

### Step 6.4: Test Pulled Image

1. Open: **http://localhost:9090**
2. App working hona chahiye

### Step 6.5: Cleanup

```bash
docker stop weather-dockerhub
docker rm weather-dockerhub
```

**Result:** ✅ DockerHub integration working!

---

## 🔄 Phase 7: End-to-End CI/CD Test

### Step 7.1: Make Code Change

```bash
# Open index.html
notepad static\index.html
```

**Change karo:** Title mein kuch add karo

```html
<title>SkySense Weather - v2.0</title>
```

Save karo.

### Step 7.2: Commit & Push

```bash
git add .
git commit -m "test: version update"
git push origin main
```

### Step 7.3: Trigger Jenkins Build

**Option A - Automatic (if webhook configured):**

- Jenkins automatically build start karega

**Option B - Manual:**

- Jenkins dashboard pe jao
- **Build Now** click karo

### Step 7.4: Monitor Deployment

1. Console Output dekho
2. All stages pass hone chahiye
3. New image DockerHub pe push hoga
4. Container restart hoga

### Step 7.5: Verify Changes Live

1. Open: **http://localhost:8080**
2. F5 press karo (refresh)
3. Browser tab mein title check karo: "SkySense Weather - v2.0"

**Result:** ✅ Complete CI/CD cycle working!

---

## 📊 Final Verification Checklist

### Code Level

- [ ] All files present and correct
- [ ] No syntax errors in Python
- [ ] No errors in HTML/CSS/JS

### Local Testing

- [ ] Python app runs locally
- [ ] Weather API working
- [ ] GPS location working
- [ ] City search working

### Docker

- [ ] Dockerfile builds successfully
- [ ] Container runs without errors
- [ ] App accessible on port 8080
- [ ] Logs show no errors

### Jenkins

- [ ] Jenkins accessible on port 8081
- [ ] Plugins installed
- [ ] Docker access working
- [ ] Credentials configured

### CI/CD Pipeline

- [ ] Pipeline job created
- [ ] Build runs successfully
- [ ] All stages pass (green)
- [ ] Image pushed to DockerHub
- [ ] Container deployed automatically

### DockerHub

- [ ] Repository visible
- [ ] Image tags present
- [ ] Can pull image
- [ ] Pulled image works

### End-to-End

- [ ] Code changes trigger build
- [ ] Build completes successfully
- [ ] Changes reflect in live app
- [ ] No downtime during deployment

---

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `Port 8080 is already allocated`

**Solution:**

```bash
docker stop weather-app
docker rm weather-app
# Then retry
```

### Issue 2: Docker Build Fails

**Error:** `Cannot connect to Docker daemon`

**Solution:**

```bash
# Start Docker Desktop
# Wait for it to fully start
docker ps
```

### Issue 3: Jenkins Can't Access Docker

**Error:** `docker: command not found`

**Solution:**

```bash
# Restart Jenkins with Docker socket
docker restart jenkins
```

### Issue 4: DockerHub Push Fails

**Error:** `denied: requested access to the resource is denied`

**Solution:**

1. Check credentials in Jenkins
2. Verify DockerHub username: `jabhii26`
3. Re-enter password if needed

### Issue 5: Weather API Not Working

**Error:** No weather data showing

**Solution:**

1. Check browser console (F12)
2. Verify internet connection
3. Check Open-Meteo API status

### Issue 6: Git Push Fails

**Error:** `Authentication failed`

**Solution:**

```bash
# Use GitHub Personal Access Token
git config credential.helper store
git push
# Enter username and token
```

---

## 🎯 Quick Test Script

Sab kuch ek saath test karne ke liye:

```bash
# 1. Check Docker
docker ps

# 2. Check Jenkins
curl http://localhost:8081

# 3. Check App
curl http://localhost:8080

# 4. Check Images
docker images | findstr weather

# 5. Check Containers
docker ps | findstr weather
```

**All commands successful = Project fully working! ✅**

---

## 📈 Performance Checks

### Check Container Resources

```bash
docker stats weather-app --no-stream
```

**Expected:**

- CPU: < 5%
- Memory: < 200MB

### Check Response Time

```bash
curl -w "@-" -o /dev/null -s http://localhost:8080
```

**Expected:** < 500ms response time

---

## 🎉 Success Criteria

Tumhara project **100% working** hai agar:

1. ✅ Local Python app runs
2. ✅ Docker container runs
3. ✅ Jenkins accessible
4. ✅ Pipeline builds successfully
5. ✅ Image on DockerHub
6. ✅ App accessible on browser
7. ✅ Weather functionality works
8. ✅ Code changes auto-deploy

**Congratulations! 🚀 Your DevOps project is fully functional!**

---

## 📞 Need Help?

Agar koi step fail ho raha hai:

1. Check error message carefully
2. Refer to Troubleshooting section
3. Check logs: `docker logs <container-name>`
4. Verify all prerequisites installed

**Happy Testing! 🧪**
