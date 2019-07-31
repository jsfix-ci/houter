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
        file: "./cjs/index.js",
        format: "cjs",
      },
      {
        file: "./lib/index.js",
        format: "es",
      }
    ]
  }
];
