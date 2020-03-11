@echo off
echo.
echo [info] TwelveT UI is being packaged
echo.

%~d0
cd %~dp0

cd ..
npm install --registry=https://registry.npm.taobao.org

pause