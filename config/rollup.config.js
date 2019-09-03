import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
  {
    input: "src/index.tsx",
    plugins: [
      commonjs(),
      resolve({
        customResolveOptions: {
          moduleDirectory: "node_modules"
        }
      }),
      typescript()
    ],
    external: ["react","path-to-regexp",'history'],
    output: [
      {
        file: "./lib/index.js",
        format: "cjs",
      },
      {
        file: "./es/index.js",
        format: "es",
      }
    ]
  }
];
