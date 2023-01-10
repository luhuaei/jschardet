import copy from "rollup-plugin-copy";

export default {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [
    copy({
      targets: [{ src: "index.d.ts", dest: "dist/" }],
    }),
  ],
};
