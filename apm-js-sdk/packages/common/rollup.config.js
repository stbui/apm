const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {
  '@apm/common': 'apm.common',
};

module.exports = {
  entry: './dist/packages/common/esm5/public_api.js',
  dest: './dist/packages/common/bnundles/common.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'apm.common',
  plugins: [resolve(), sourcemaps()],
  external: Object.keys(globals),
  globals: globals
};
