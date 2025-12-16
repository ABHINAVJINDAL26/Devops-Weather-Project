# ⚡ SkySense Weather Dashboard - Ready for Demo

Modern weather dashboard with real-time forecasts, built with FastAPI and deployed using DevOps practices.

> 🚀 **Live CI/CD Pipeline Demo Ready!**

## 🌟 Features

- 🌤️ Real-time weather data
- 📍 GPS location support
- 🔍 City search functionality
- 📊 Hourly & 5-day forecasts
- 🎨 Modern glassmorphism UI
- 📱 Responsive design

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- Open-Meteo Weather API

**Backend:**
- Python 3.11
- FastAPI

**DevOps:**
- Docker
- Jenkins (CI/CD)
- GitHub
- DockerHub

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
uvicorn app.main:app --reload

# Visit: http://localhost:8000
```

### Docker
```bash
# Build image
docker build -t weather-dashboard .

# Run container
docker run -d -p 8080:8080 weather-dashboard

# Visit: http://localhost:8080
```

## 📦 Docker Commands

```bash
# Build
docker build -t yourusername/weather-dashboard:latest .

# Push to DockerHub
docker push yourusername/weather-dashboard:latest

# Pull and run
docker pull yourusername/weather-dashboard:latest
docker run -d -p 8080:8080 weather-dashboard
```

## 🔄 CI/CD Pipeline

This project uses Jenkins for automated:
- ✅ Code checkout from GitHub
- ✅ Docker image building
- ✅ Push to DockerHub
- ✅ Automatic deployment

## 📝 Project Structure

```
DevopsProject/
├── app/
│   ├── __init__.py
│   └── main.py
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Dockerfile
├── Jenkinsfile
├── requirements.txt
└── README.md
```

## 🌐 API Used

- [Open-Meteo Weather API](https://open-meteo.com/) - Free weather data

## 👨‍💻 Author

Built with ❤️ as a DevOps learning project

## 📄 License

MIT License
