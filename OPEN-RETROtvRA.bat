@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  start "RetroRadtv v2 Preview Server" /min cmd /c "py -3 open_demo.py --port 8782 --no-browser"
) else (
  start "RetroRadtv v2 Preview Server" /min cmd /c "python open_demo.py --port 8782 --no-browser"
)
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8782/?local-build=3.0.162"
