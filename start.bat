@echo off
:: CivicSense Quick Start (Batch Version)
echo Starting CivicSense Application...
echo.

:: Start Backend
echo Starting Backend Server...
start "CivicSense Backend" cmd /k "cd backend && npm run dev"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Start Frontend
echo Starting Frontend Server...
start "CivicSense Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting!
echo Open your browser to: http://localhost:3000
echo.
pause
