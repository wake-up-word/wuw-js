import { wasm } from '@rollup/plugin-wasm';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'main.ts',
    output: {
        file: 'output.js',
        format: 'cjs'
    },
    plugins: [
        wasm(),
        typescript(),
    ]
};