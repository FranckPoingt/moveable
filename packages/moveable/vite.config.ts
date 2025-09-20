import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

const externalDeps = {
    croact: "croact",
    "croact-ruler": "croact-ruler",
    "croact-moveable": "croact-moveable",
    "croact-css-styled": "croact-css-styled",
    "@daybrush/utils": "utils",
    "css-styled": "css-styled",
    "framework-utils": "framework-utils",
    gesto: "Gesto",
    "@scena/event-emitter": "@scena/event-emitter",
    "@egjs/agent": "eg.Agent",
    "@egjs/children-differ": "eg.ChildrenDiffer",
    "@moveable/matrix": "@moveable/matrix",
    "@scena/dragscroll": "@scena/dragscroll",
    "css-to-mat": "css-to-mat",
    "overlap-area": "overlap-area",
    "@scena/matrix": "@scena/matrix",
    "@egjs/list-differ": "eg.ListDiffer",
    "react-moveable": "react-moveable", // Add this
    "react-moveable/types": "react-moveable/types", // Add this
};

export default defineConfig(() => {
    const isUmdBuild = process.env.BUILD_UMD === "true";

    return {
        plugins: [
            dts({
                include: ["src/**/*"],
                exclude: ["stories/**/*", "test/**/*"],
                outDir: "declaration",
                insertTypesEntry: true,
                rollupTypes: false,
            }),
        ],
        build: {
            emptyOutDir: !isUmdBuild,
            lib: {
                entry: isUmdBuild ? resolve(__dirname, "src/index.umd.ts") : resolve(__dirname, "src/index.ts"),
                name: "Moveable",
                formats: isUmdBuild ? ["umd"] : ["es", "cjs"],
                fileName: (format) => {
                    if (format === "es") return `moveable.esm.js`;
                    if (format === "cjs") return `moveable.cjs.js`;
                    if (isUmdBuild) return `moveable.js`;
                    return `moveable.umd.js`;
                },
            },
            rollupOptions: {
                external: Object.keys(externalDeps),
                output: {
                    exports: "named",
                    globals: externalDeps,
                },
                treeshake: {
                    preset: "recommended",
                    moduleSideEffects: false,
                    propertyReadSideEffects: false,
                    unknownGlobalSideEffects: false,
                },
                onwarn(warning, warn) {
                    if (
                        warning.code === "SOURCEMAP_BROKEN" ||
                        (warning.message &&
                            warning.message.includes("@daybrush/utils") &&
                            warning.message.includes("/*#__PURE__*/"))
                    ) {
                        return;
                    }
                    warn(warning);
                },
            },
            sourcemap: true,
            target: "es2020",
            minify: "esbuild",
            chunkSizeWarningLimit: 1000,
        },
        resolve: {
            alias: {
                "@/moveable": resolve(__dirname, "src"),
            },
        },
        esbuild: {
            target: "es2020",
        },
    };
});
