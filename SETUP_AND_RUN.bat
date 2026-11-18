@echo off
setlocal
cd /d "%~dp0"
title Lahore VIP Food Setup

echo ==========================================
echo Lahore VIP Food - First Setup
echo ==========================================
echo.

if exist ".venv\Scripts\python.exe" goto install

echo Creating virtual environment...
py -m venv .venv
if errorlevel 1 goto failed

:install
echo Installing packages...
".venv\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 goto failed
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto failed

echo Preparing database...
".venv\Scripts\python.exe" manage.py migrate
if errorlevel 1 goto failed

echo Importing menu...
".venv\Scripts\python.exe" manage.py seed_menu
if errorlevel 1 goto failed

echo Starting website at http://127.0.0.1:8000/
".venv\Scripts\python.exe" manage.py runserver
pause
exit /b 0

:failed
echo.
echo SETUP FAILED. Keep this window open and send a screenshot.
pause
exit /b 1
