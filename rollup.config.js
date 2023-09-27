import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: "utools/preload.js",
  output: {
    // dir: "dist",
    sourcemap: "inline",
    format: "cjs",
    // exports: "default",
    file: "dist/preload.js",
  },
  plugins: [
    nodeResolve({ browser: false }),
    commonjs(),
    copy({
      targets: [
        { src: "utools/plugin.json", dest: "dist" },
        { src: "utools/logo.png", dest: "dist" },
        { src: "utools/package.json", dest: "dist" },
        { src: "node_modules/everything-node/dist/bin", dest: "dist" },
      ],
    }),
  ],
};
