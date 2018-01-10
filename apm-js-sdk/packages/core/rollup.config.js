
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: './dist/packages/core/esm5/public_api.js',
  output: [
    {
      file: './dist/packages/core/bnundles/core.common.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: './dist/packages/core/bnundles/core.umd.js',
      format: 'umd',
      exports: 'named',
      moduleName: 'apm.core',
    },
    {
      file: './dist/packages/core/bnundles/core.esm.js',
      format: 'es',
      exports: 'named',
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    // uglify(),
    sourcemaps()
  ],
  banner: '/* apm-js-sdk */'
};
