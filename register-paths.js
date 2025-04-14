const path = require('path');
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

// const baseUrl = tsConfig.compilerOptions.baseUrl || '.';
const outDir = tsConfig.compilerOptions.outDir || '.';
const explicitParams = {
  baseUrl: path.resolve(outDir),
  paths: tsConfig.compilerOptions.paths,
};
const cleanup = tsConfigPaths.register(explicitParams);

// TODO: clean-up when path registration is no longer needed
//cleanup();
