 @ECHO OFF
rmdir dist
mkdir dist
MOVE *.js dist\
MOVE *.map dist\
XCOPY *.d.ts dist\
XCOPY *.json dist\*
cd dist
REM npm publish