@echo off
cd /d "%~dp0"
if not exist node_modules\playwright (
 call npm ci
 if errorlevel 1 goto end
)
node scripts\sync-pinterest.cjs --prepare
if errorlevel 1 goto end
node server.cjs --open
:end
pause
