import scss from "rollup-plugin-scss";
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// console.log(__dirname, path.relative(__dirname, './dist/index.css'));

const config = defineConfig(
    [
        {
            input: "src/index.ts",
            output: [
                {
                    file: 'dist/index.umd.js',
                    format: 'umd',
                    name: 'FlipNumber',
                },
                {
                    file: "dist/index.es.js",
                    format: "es",
                },
                {
                    file: "dist/index.cjs.js",
                    format: "cjs",
                },
            ],
            plugins: [typescript()]
        },
        {
            input: "src/index.scss",
            output: {
                file: 'dist/index.css',
            },
            plugins: [
                scss({
                    fileName: 'index.css',
                    // outputStyle: 'compressed' // 可选，压缩CSS
                }),
            ],
        },
    ]
);

export default config;
