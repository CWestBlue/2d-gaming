rmdir dist
mkdir dist
MOVE *.js dist\
MOVE *.map dist\
XCOPY *.d.ts dist\
XCOPY *.json dist\*
echo export * from './2d-gaming.d.ts'; >>dist\index.js
echo export * from './2d-gaming.d.ts'; >>dist\index.js