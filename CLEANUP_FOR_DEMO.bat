@echo off
echo ========================================
echo    CLEANUP FOR FRESH DEMO
echo ========================================

echo.
echo [1/4] Stopping existing containers...
docker stop weather-app 2>nul
docker stop weather-fresh 2>nul
docker stop jenkins-fresh 2>nul

echo.
echo [2/4] Removing containers...
docker rm weather-app 2>nul
docker rm weather-fresh 2>nul
docker rm jenkins-fresh 2>nul

echo.
echo [3/4] Removing demo images...
docker rmi weather-dashboard-fresh 2>nul
docker rmi weather-fresh 2>nul

echo.
echo [4/4] Cleaning up volumes...
docker volume rm jenkins_home_fresh 2>nul

echo.
echo ========================================
echo    CLEANUP COMPLETE!
echo    Ready for fresh demo
echo ========================================

echo.
echo Current Docker status:
docker ps
echo.
echo Available ports for demo:
echo - Port 8090: Fresh app demo
echo - Port 8082: Fresh Jenkins demo
echo - Port 8081: Existing Jenkins (backup)

pause