import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { angular } from "@nitedani/vite-plugin-angular/plugin";
import commonjs from "vite-plugin-commonjs";
import Decorators from "@babel/plugin-proposal-decorators";

// config.resolve.alias["@/stories"] = path.resolve(__dirname, "../stories");
// config.resolve.alias["@/react-moveable"] = path.resolve(__dirname, "../src");
// config.resolve.alias["@/helper"] = path.resolve(__dirname, "../../helper/src");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        commonjs(),
        react({
            include: [path.resolve(__dirname, "../packages/react-moveable/src")],
        }),
    ],
    resolve: {
        alias: [
            {
                find: "@/react-moveable",
                replacement: path.resolve(__dirname, "../packages/react-moveable/src"),
            },
            {
                find: "moveable",
                replacement: path.resolve(__dirname, "../packages/moveable/dist/moveable.esm.js"),
            },
            {
                find: "@moveable/helper",
                replacement: path.resolve(__dirname, "../packages/helper/src"),
            },
            {
                find: "react-moveable",
                replacement: path.resolve(__dirname, "../packages/react-moveable/src"),
            },
        ],
    },
});
