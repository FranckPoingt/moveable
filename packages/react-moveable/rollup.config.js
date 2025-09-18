const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

const defaultOptions = {
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs(),
        typescript({
            tsconfig: "tsconfig.build.json",
            declaration: false,
            declarationMap: false,
            include: ["src/**/*"],
            exclude: ["stories/**/*", "test/**/*"],
        }),
    ],
    external: ["react", "react-dom"],
};

module.exports = [
    {
        ...defaultOptions,
        input: "src/index.ts",
        output: {
            file: "./dist/moveable.esm.js",
            format: "es",
            exports: "named",
            sourcemap: true,
        },
    },
    {
        ...defaultOptions,
        input: "src/index.umd.ts",
        output: {
            file: "./dist/moveable.cjs.js",
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
    },
];
