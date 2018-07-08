import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  input: "./dist/src/index.js",
  output: [
    {
      file: "./dist/index.common.js",
      format: "cjs",
      exports: "named"
    },
    {
      file: "./dist/index.umd.js",
      format: "umd",
      exports: "named",
      moduleName: "ik.editor.drop"
    },
    {
      file: "./dist/index.esm.js",
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
    sourcemaps()
  ]
};
