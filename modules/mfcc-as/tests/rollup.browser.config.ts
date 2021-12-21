import { wasm } from 'rollup-plugin-wasm-base64';
import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
    output: {
        file: 'output.js',
        format: 'cjs',
        sourcemap: 'inline'
    },
    plugins: [
        wasm(),
        typescript(),
        resolve()
    ]
};