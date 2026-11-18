@echo off
title Lahore VIP Food - Create Admin
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo First run SETUP_AND_RUN.bat.
  pause
  exit /b 1
)

".venv\Scripts\python.exe" manage.py createsuperuser
pause
