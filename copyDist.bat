rmdir dist
mkdir dist
cd dist
mkdir ObjectLogic
mkdir Design
cd ..
MOVE *.js dist\
MOVE *.map dist\
MOVE ObjectLogic\*.js dist\ObjectLogic\
MOVE ObjectLogic\*.map dist\ObjectLogic\
MOVE Design\*.js dist\Design\
MOVE Design\*.map dist\Design\
XCOPY *.d.ts dist\
XCOPY *.json dist\*
cd dist
REM npm publish