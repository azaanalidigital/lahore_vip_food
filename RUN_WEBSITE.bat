@echo off
title Lahore VIP Food
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo First run SETUP_AND_RUN.bat to install the website.
  pause
  exit /b 1
)

".venv\Scripts\python.exe" manage.py migrate
if errorlevel 1 (
  pause
  exit /b 1
)

echo Website: http://127.0.0.1:8000/
".venv\Scripts\python.exe" manage.py runserver
pause
