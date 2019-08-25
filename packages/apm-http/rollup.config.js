const typescript = require('rollup-plugin-typescript2');
const { join } = require('path');
function resolver(path) {
  return join(__dirname, path);
}
module.exports = {
  input: resolver('src/index.ts'),
  output: [
    {
      file: resolver('dist/http.common.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: resolver('dist/http.umd.js'),
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      name: 'apm.http'
    },
    {
      file: resolver('dist/http.esm.js'),
      format: 'es',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    typescript({
      tsconfig: resolver('../tsconfig.json'),
      typescript: require('typescript')
    })
  ]
};
