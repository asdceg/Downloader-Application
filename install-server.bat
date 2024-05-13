@echo off

echo Starting installation...

echo Installing dependencies...

msiexec /i "Packages\node-v20.12.2-x64.msi"

rem Check if Node.js is installed

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Node.js is installed. Restarting PC in 60 seconds...
    shutdown /r /t 60 /c "Restarting PC..."
) else (
    echo Node.js is not installed. Please install it manually and then restart your computer.
)

:: echo Dependencies Installed.

:: echo Please restart your computer...

:: echo Restarting PC in 60 seconds...
:: shutdown /r /t 60 /c "Restarting PC..."