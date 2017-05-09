rmdir dist
mkdir dist
cd dist
mkdir ObjectLogic
mkdir Design
mkdir GameAreaLogic
cd ..
MOVE *.js dist\
MOVE *.map dist\
MOVE ObjectLogic\*.js dist\ObjectLogic\
MOVE ObjectLogic\*.map dist\ObjectLogic\
MOVE Design\*.js dist\Design\
MOVE Design\*.map dist\Design\
MOVE GameAreaLogic\*.js dist\GameAreaLogic\
MOVE GameAreaLogic\*.map dist\GameAreaLogic\
XCOPY *.d.ts dist\
XCOPY *.json dist\*
cd dist
npm publish