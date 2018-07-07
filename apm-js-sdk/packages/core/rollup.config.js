const typescript = require('rollup-plugin-typescript2');
const { join } = require('path');
function resolver(path) {
  return join(__dirname, path);
}
module.exports = {
  input: resolver('src/index.ts'),
  output: [
    {
      file: resolver('bnundles/core.common.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: resolver('bnundles/core.umd.js'),
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      moduleName: 'apm.core'
    },
    {
      file: resolver('bnundles/core.esm.js'),
      format: 'es',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    typescript({
      tsconfig: resolver('tsconfig.json'),
      typescript: require('typescript')
    })
  ]
};
