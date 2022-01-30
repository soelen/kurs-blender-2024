import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import copy from "rollup-plugin-copy";

const main = {
  input: 'src/main.js',
  output: {
    dir: "dist",
    format: "es",
    sourcemap: false
  },
  plugins: [
    resolve({
      exportConditions: ['production']
    }),
    replace({
      "preventAssignment": true,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    }),
    strip({
      functions: ["console.log"],
    }),
    copy({
      targets: [
        { src: "assets", dest: "dist/" },
        { src: "src/main.css", dest: "dist/" },
        { src: "manifest.json", dest: "dist/" },
        { src : "node_modules/hackers-tiny-slide-deck/build/htsd.min.js", dest: "dist/"},
      ],
    })
  ],
  preserveEntrySignatures: 'strict',
};

const sw = {
  input: 'sw.js',
  output: {
    dir: "dist",
    format: "es",
    sourcemap: false
  },
  plugins: [
    replace({
      "preventAssignment": true,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    }),
    resolve({
      exportConditions: ['production']
    }),
  ],
  preserveEntrySignatures: 'strict',
};

export default [ main, sw ];