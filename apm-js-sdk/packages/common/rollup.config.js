import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";
import resolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  input: "./dist/packages/common/esm5/public_api.js",
  output: [
    {
      file: "./dist/packages/common/bnundles/common.common.js",
      format: "cjs",
      exports: "named"
    },
    {
      file: "./dist/packages/common/bnundles/common.umd.js",
      format: "umd",
      exports: "named",
      moduleName: "apm.common"
    },
    {
      file: "./dist/packages/common/bnundles/common.esm.js",
      format: "es",
      exports: "named"
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    // uglify(),
    sourcemaps()
  ]
};
