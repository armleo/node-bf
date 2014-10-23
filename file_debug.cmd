@echo off
cd src
echo start time:%time%9
node node-bf.js ../test/test.a > tmp/output
echo end time:%time%0
pause
