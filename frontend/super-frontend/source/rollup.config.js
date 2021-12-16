import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import duplicateFile from "./rollup.duplicate";

const jsPlugins = [resolve(), commonjs(), babel({ babelHelpers: "bundled" })];

export default [
  {
    input: "src/stylesheets/application.css",
    output: [
      {
        file: "../../../app/assets/stylesheets/super/application.css",
        format: "es",
      },
    ],
    plugins: [postcss({ extract: true }), duplicateFile()],
  },
  {
    context: "window",
    input: "src/javascripts/application.js",
    output: [
      {
        file: "../../../app/assets/javascripts/super/application.js",
        format: "iife",
        name: "Super",
      },
    ],
    plugins: jsPlugins,
  },
  {
    context: "window",
    input: "src/javascripts/application.js",
    output: [
      {
        file: "../dist/application.js",
        format: "es",
      },
    ],
    plugins: jsPlugins,
  },
];
