const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {
  '@apm/core': 'apm.core',
  '@apm/common': 'apm.common',
};

module.exports = {
  entry: './dist/packages/core/esm5/public_api.js',
  dest: './dist/packages/core/bnundles/core.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'apm.core',
  plugins: [resolve(), sourcemaps()],
  external: Object.keys(globals),
  globals: globals,
  banner: '/* test */'
};
