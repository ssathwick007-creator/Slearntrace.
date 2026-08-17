@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo          LearnTrace Developer Startup System
echo =======================================================

echo.
echo [1] Checking Docker...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [1] Docker is not running. Attempting to start Docker Desktop...
    if exist "C:\Program Files\Docker\Docker\Docker Desktop.exe" (
        start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    ) else (
        echo [ERROR] Docker Desktop not found at default location.
        echo Please start Docker Desktop manually.
        pause
        exit /b 1
    )
    
    echo [1] Waiting for Docker to start...
    :wait_docker
    timeout /t 3 /nobreak >nul
    docker info >nul 2>&1
    if !errorlevel! neq 0 (
        goto wait_docker
    )
)
echo [1] Docker is running and ready.

echo.
echo [2] Checking Backend (Port 5000)...
netstat -ano | findstr :5000 >nul
if %errorlevel% neq 0 (
    echo [2] Backend is not running. Starting LearnTrace backend...
    start "LearnTrace Backend" cmd /k "cd backend && npm run dev"
) else (
    echo [2] Backend is already running on Port 5000. Reusing existing process.
)

echo.
echo [2] Waiting for Backend to be ready...
:wait_backend
timeout /t 3 /nobreak >nul
curl -s http://localhost:5000/health | findstr "ready" >nul
if !errorlevel! neq 0 (
    goto wait_backend
)
echo [2] Backend is ready.

echo.
echo [3] Checking Frontend (Port 5173)...
netstat -ano | findstr :5173 >nul
if %errorlevel% neq 0 (
    echo [3] Frontend is not running. Starting LearnTrace frontend...
    start "LearnTrace Frontend" cmd /k "npm run dev"
) else (
    echo [3] Frontend is already running on Port 5173. Reusing existing process.
)

echo.
echo =======================================================
echo     LearnTrace is ready!
echo     The frontend should open in your browser.
echo =======================================================
pause
